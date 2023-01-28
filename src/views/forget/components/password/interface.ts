export interface StateProps {
  messageForm: MessageFormProps
  messageRules: RulesProps
}

interface MessageFormProps {
  password: string
  newPassword: string
}

interface RulesProps {
  password: RulesItemProps[]
  newPassword: RulesItemProps[]
}

interface RulesItemProps {
  required: boolean
  validator?: any
  trigger: string
}
