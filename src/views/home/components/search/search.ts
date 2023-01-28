import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import HomeApi from '@/api/home'
import MapInfo from '@/api/map'
import LoginApi from '@/api/login'
import { SearchState } from './interface'
import { formatStapTime } from '@/utils/index'
import { mapState, useMapMethod } from '@/views/home/components/map/map'
import dayjs from 'dayjs'

import carIcon from '@/assets/imgs/home/icon-car.png'
import overtimeIcon from '@/assets/imgs/home/icon-stop.png'
import overspeedIcon from '@/assets/imgs/home/icon-speed.png'
import startIcon from '@/assets/imgs/home/icon-start.png'
import endIcon from '@/assets/imgs/home/icon-end.png'
import Cookies from 'js-cookie'
import { setToken, setUserId, getUserId } from '@/utils/auth'

export const searchState = reactive(<SearchState>{
  navs: ['车辆实时位置查询', '车辆历史轨迹查询'],
  currentIndex: 0,
  province: '京',
  number: '',
  plateColor: 2,
  time: [],
  displayTime: [],
  carInfo: null,
  routeInfo: null,
  defaultTime: [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)],
  pathList: [],
  positionStart: null,
  positionEnd: null,
  abnormalNum: 0,
  overspeedNum: 0,
  options: [
    '京',
    '沪',
    '粤',
    '津',
    '冀',
    '豫',
    '云',
    '辽',
    '黑',
    '湘',
    '皖',
    '鲁',
    '苏',
    '浙',
    '赣',
    '鄂',
    '桂',
    '甘',
    '晋',
    '陕',
    '蒙',
    '吉',
    '闽',
    '贵',
    '渝',
    '川',
    '青',
    '琼',
    '宁',
    '挂',
    '藏',
    '港',
    '澳',
    '新',
    '使',
    '学'
  ],
  carColorList: [
    {
      label: '黄牌',
      value: 2
    },
    {
      label: '蓝牌',
      value: 1
    },
    {
      label: '黄绿牌',
      value: 3
    }
  ],
  isExperience: false
})

export const useSearchMethod = () => {
  const router = useRouter()
  const { clearMap } = useMapMethod()
  /**
   * nav 切换
   */
  const cutNav = (index: number) => {
    searchState.currentIndex = index
  }

  /**
   * 车牌号输入 失焦状态
   */
  const onBlur = () => {
    const pattern = /[`~!@#$^\-&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g
    searchState.number = searchState.number.replace(pattern, '').toUpperCase()
  }

  /**
   * 车辆实时位置查询
   */
  const getCarLocation = async () => {
    if (!searchState.number) {
      ElMessage.error('请输入车牌号')
      return
    } else {
      const reg = /([A-Z0-9]){6,7}?$/
      if (!reg.test(searchState.number)) {
        ElMessage.error('车牌号格式错误，请重新输入')
        return
      }
    }
    if (searchState.currentIndex === 1 && searchState.time.length === 0) {
      ElMessage.error('请选择轨迹开始结束时间')
      return
    }
    getUserBalancePreInquiry()
  }

  /**
   * 用户余额查询
   */
  const getUserBalancePreInquiry = async () => {
    const param = {
      userId: getUserId(),
      serviceName: searchState.currentIndex === 0 ? '实时位置查询' : '历史轨迹查询',
      plateColor: searchState.plateColor,
      plateNo: searchState.province + searchState.number,
      startTime: Date.parse(searchState.time[0]),
      endTime: Date.parse(searchState.time[1])
    }
    try {
      await HomeApi.userBalancePreInquiry(param)
      getCar()
    } catch (error) {
      ElMessageBox.confirm('您的余额不足，请先进行充值！', '提示', {
        showCancelButton: true,
        confirmButtonText: '立即充值',
        cancelButtonText: '取消'
      })
        .then(() => {
          router.push('/cost/wallet')
        })
        .catch(() => {
          // console.log('取消')
        })
    }
  }

  /**
   * 调取汽车查询接口
   */
  const getCar = () => {
    const params = {
      plateColor: searchState.plateColor,
      plateNo: searchState.province + searchState.number
    }
    searchState.displayTime = searchState.time
    clearMap()
    if (searchState.currentIndex === 0) {
      getCarLocationDetail(params)
    } else {
      getHistoryRoute(params)
    }
  }

  /**
   * 车辆位置信息
   */
  const getCarLocationDetail = async (params: any) => {
    const res = await MapInfo.getCurLocation(params)
    searchState.carInfo = res.body
    formatDirectionTxt(res.body.direction)
    addCarIcon()
  }

  /**
   * 车辆历史轨迹
   */
  const getHistoryRoute = async (params: any) => {
    const param = {
      ...params,
      startTime: Date.parse(searchState.time[0]),
      endTime: Date.parse(searchState.time[1])
    }
    const res = await MapInfo.getHistoryRoute(param)
    searchState.routeInfo = res.body
    searchState.pathList = []
    for (const item of res.body.historyRouteList) {
      searchState.pathList.push([item.lon, item.lat])
    }
    const len = searchState.pathList.length
    searchState.positionStart = new AMap.LngLat(searchState.pathList[0][0], searchState.pathList[0][1])
    searchState.positionEnd = new AMap.LngLat(searchState.pathList[len - 1][0], searchState.pathList[len - 1][1])
    getOverspeedList(res.body.truckRouteNo)
    getOvertimeList(res.body.truckRouteNo)
    addIcon()
    currentPositionLine(searchState.pathList, '#66AE35')
  }

  /**
   * 车辆方向
   */
  const formatDirectionTxt = (value: string) => {
    const val = Number(value)
    if (val === 0) {
      searchState.carInfo.directionTxt = '正北'
    } else if (val > 0 && val < 90) {
      searchState.carInfo.directionTxt = '东北'
    } else if (val === 90) {
      searchState.carInfo.directionTxt = '正东'
    } else if (val > 90 && val < 180) {
      searchState.carInfo.directionTxt = '东南'
    } else if (val === 180) {
      searchState.carInfo.directionTxt = '正南'
    } else if (val > 180 && val < 270) {
      searchState.carInfo.directionTxt = '西南'
    } else if (val === 270) {
      searchState.carInfo.directionTxt = '正西'
    } else if (val > 270 && val < 359) {
      searchState.carInfo.directionTxt = '西北'
    }
  }

  /**
   * 车辆图标 marker
   */
  const addCarIcon = () => {
    const positionCar = new AMap.LngLat(searchState.carInfo.location[0], searchState.carInfo.location[1])
    const iconCar = new AMap.Icon({
      size: new AMap.Size(80, 80),
      image: carIcon,
      imageSize: new AMap.Size(80, 80)
    })
    const carMarker = new AMap.Marker({
      position: positionCar,
      icon: iconCar,
      anchor: 'center',
      angle: Number(searchState.carInfo.direction)
    })
    carMarker.setMap(mapState.map)
    mapState.map.setCenter(positionCar)
  }

  /**
   * 超速查询
   */
  const getOverspeedList = async (truckRouteNo: string) => {
    const res = await MapInfo.getOverspeedList({ truckRouteNo: truckRouteNo })
    if (res.body.overspeedList?.length) {
      searchState.overspeedNum = res.body.overspeedList.length
      addAbnormalMarker(res.body.overspeedList, 2)
    }
  }

  /**
   * 停车超时查询
   */
  const getOvertimeList = async (truckRouteNo: string) => {
    const res = await MapInfo.getOvertimeList({ truckRouteNo: truckRouteNo })
    if (res.body.stopoverList?.length) {
      searchState.abnormalNum = res.body.stopoverList.length
      addAbnormalMarker(res.body.stopoverList, 1)
    }
  }

  /**
   * 添加超时超速marker
   */
  const addAbnormalMarker = (markerData: any, type: number) => {
    let icon: any
    const len = markerData.length
    const iconOverTime = new AMap.Icon({
      size: new AMap.Size(42, 50),
      image: overtimeIcon,
      imageSize: new AMap.Size(42, 50)
    })
    const iconOverSpeed = new AMap.Icon({
      size: new AMap.Size(42, 50),
      image: overspeedIcon,
      imageSize: new AMap.Size(42, 50)
    })
    // 超时
    if (type === 1) {
      icon = iconOverTime
    } else {
      icon = iconOverSpeed
    }
    for (let i = 0; i < len; i++) {
      let extDataObj = {}
      if (type === 1) {
        extDataObj = {
          address: markerData[i].address,
          duration: markerData[i].duration,
          section: formatStapTime(markerData[i].startTime, 6) + ' - ' + formatStapTime(markerData[i].endTime, 6),
          labelType: 1
        }
      } else {
        extDataObj = {
          address: markerData[i].address,
          speed: markerData[i].speed,
          labelType: 2
        }
      }
      const abnormalMarker = new AMap.Marker({
        position: new AMap.LngLat(markerData[i].lon, markerData[i].lat),
        icon: icon,
        anchor: 'bottom-center',
        zIndex: 199,
        extData: extDataObj
      })
      abnormalMarker.setMap(mapState.map)
      abnormalMarker.on('click', markerClick)
    }
  }

  /**
   * 点击 marker
   */
  const markerClick = (e: any) => {
    const content = []
    // 超时
    if (e.target.getExtData().labelType === 1) {
      const labelLocation = '停车位置：<span style="font-weight: 400;">' + e.target.getExtData().address + '</span>'
      const labelTime = '停车时长：<span style="font-weight: 400;">' + e.target.getExtData().duration + '分钟</span>'
      const labelSection = '停车区间：<span style="font-weight: 400;">' + e.target.getExtData().section + '</span>'
      content.push('<div>' + labelLocation + '</div>')
      content.push('<div>' + labelTime + '</div>')
      content.push('<div>' + labelSection + '</div>')
    } else {
      const labelLocation = '超速位置：<span style="font-weight: 400;">' + e.target.getExtData().address + '</span>'
      const labelSpeed = '车速：<span style="font-weight: 400;">' + e.target.getExtData().speed + 'km/h</span>'
      content.push('<div>' + labelLocation + '</div>')
      content.push('<div>' + labelSpeed + '</div>')
    }

    // 构建自定义信息窗体
    const inforWindow = new AMap.InfoWindow({
      content: createInfoWindow(content.join('')),
      anchor: 'bottom-center',
      isCustom: true, // 使用自定义窗体
      offset: new AMap.Pixel(0, -50),
      autoMove: true,
      closeWhenClickMap: true
    })

    inforWindow.open(mapState.map, e.target.getPosition())
  }

  /**
   * 信息窗体
   */
  const createInfoWindow = (content: any) => {
    const info = document.createElement('div')
    info.className = 'gwin-geti-custom-info'
    // 定义中部内容
    const middle = document.createElement('div')
    middle.className = 'gwin-geti-info-content'
    middle.innerHTML = content
    info.appendChild(middle)
    return info
  }

  /**
   * 起始点
   */
  const addIcon = () => {
    const fillStartColor = '#66AE35'
    const fillEndColor = '#66AE35'

    let circleStart: any = ''
    let circleEnd: any = ''
    const iconStart = new AMap.Icon({
      size: new AMap.Size(40, 40),
      image: startIcon,
      imageSize: new AMap.Size(40, 40)
    })
    const iconEnd = new AMap.Icon({
      size: new AMap.Size(40, 40),
      image: endIcon,
      imageSize: new AMap.Size(40, 40)
    })

    const startMarker = new AMap.Marker({
      position: searchState.positionStart,
      icon: iconStart,
      anchor: 'bottom-center',
      zIndex: 999
    })

    startMarker.setMap(mapState.map)

    circleStart = new AMap.CircleMarker({
      center: searchState.positionStart,
      fillColor: fillStartColor,
      fillOpacity: 1,
      strokeWeight: 0,
      zIndex: 99,
      radius: 8 // 半径，单位：px
    })

    circleStart.setMap(mapState.map)

    const endMarker = new AMap.Marker({
      position: searchState.positionEnd,
      icon: iconEnd,
      anchor: 'bottom-center',
      zIndex: 999
    })
    endMarker.setMap(mapState.map)

    circleEnd = new AMap.CircleMarker({
      center: searchState.positionEnd,
      fillColor: fillEndColor,
      fillOpacity: 1,
      strokeWeight: 0,
      zIndex: 99,
      radius: 8 // 半径，单位：px
    })

    circleEnd.setMap(mapState.map)
    mapState.map.setFitView(null, false, [300, 100, 700, 300])
  }

  /**
   * 历史轨迹
   */
  const currentPositionLine = (result: any, color: string) => {
    const polyline = new AMap.Polyline({
      path: result,
      strokeWeight: 8,
      lineJoin: 'round',
      lineCap: 'round',
      strokeColor: color,
      strokeOpacity: 1,
      showDir: true
    })
    mapState.map.add(polyline)
    mapState.map.setFitView(null, false, [300, 100, 700, 300])
  }

  // 限制时间选择
  const disabledDate = (time: Date) => {
    return (
      time.getTime() > new Date(dayjs().valueOf()).getTime() ||
      time.getTime() < new Date(dayjs().valueOf() - 15768000000).getTime()
    )
  }

  function login(account: string, password: string) {
    const baseInfo = {
      account: account,
      passportType: 'mobile',
      password: password
    }

    LoginApi.login(baseInfo)
      .then((res: any) => {
        setToken(res.body.accessToken)
        setUserId(res.body.userId)
      })
      .catch((err) => {
        ElMessage.error(err.message)
      })
  }

  onMounted(() => {
    const route = useRoute()
    document.title = '车辆轨迹查询'
    const accountRouter = route.query.account as string
    const password = route.query.password as string
    let account: any = ''
    if (accountRouter && password) {
      Cookies.set('account', accountRouter)
      account = accountRouter
      login(account, password)
    } else {
      account = Cookies.get('account')
    }

    if (account === '18688668866') {
      searchState.isExperience = true
      searchState.province = '京'
      searchState.number = 'JY6666'
      searchState.time = ['2022-06-14 17:00:00', '2022-06-15 00:00:00']
    } else {
      searchState.isExperience = false
      searchState.province = '京'
      searchState.number = ''
      searchState.time = []
    }
  })

  return {
    disabledDate,
    cutNav,
    onBlur,
    getCarLocation
  }
}
