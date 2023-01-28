export interface StateProps {
  messageForm: MessageFormProps
  messageRules: RulesProps
  messageDisabled: boolean
  meassageTimes: number
  mobileDisabled: boolean
  isShowMessageTip: boolean
}

interface MessageFormProps {
  mobile: string
  pinCode: string
}

interface RulesProps {
  mobile: RulesItemProps[]
  pinCode: RulesItemProps[]
}

interface RulesItemProps {
  required: boolean
  validator?: any
  trigger: string
}
