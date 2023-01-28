import { reactive } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

interface MapState {
  map: any
}

export const mapState = reactive(<MapState>{
  map: null
})

export const useMapMethod = () => {
  /**
   * map 初始
   */
  const initMap = () => {
    AMapLoader.load({
      key: '02bab87497ea3bebf54a4721ab6d2fe1',
      version: '2.0'
    })
      .then((AMap) => {
        mapState.map = new AMap.Map('map', {
          // 设置地图容器id
          resizeEnable: true,
          mapStyle: 'amap://styles/24f7dd35795c13f255fcfff6c057234f'
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  /**
   * map 清除元素
   */
  const clearMap = () => {
    mapState.map?.clearMap()
  }

  /**
   * map 销毁
   */
  const destroyMap = () => {
    mapState.map?.destroy()
  }
  return {
    initMap,
    clearMap,
    destroyMap
  }
}
