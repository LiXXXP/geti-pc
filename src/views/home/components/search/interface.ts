export interface SearchState {
  navs: string[]
  currentIndex: number
  province: string
  number: string
  plateColor: number
  options: string[]
  carColorList: CarColorList[]
  time: any[]
  displayTime: any[]
  carInfo: any
  routeInfo: any
  defaultTime: any[]
  pathList: any[]
  positionStart: any
  positionEnd: any
  abnormalNum: number
  overspeedNum: number
  isExperience: boolean
}

interface CarColorList {
  label: string
  value: number
}
