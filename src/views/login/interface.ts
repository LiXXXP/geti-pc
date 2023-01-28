export interface LoginProps {
  account: string | number
  password: string
}

export interface RulesProps {
  account: RuleItemProps[]
  password: RuleItemProps[]
}

interface RuleItemProps {
  required?: boolean
  message?: string
  trigger?: string
  pattern?: RegExp
  validator?: any
}

export interface StateProps {
  loginForm: LoginProps
  accountRules: RulesProps
}
