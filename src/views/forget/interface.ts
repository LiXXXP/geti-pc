export interface StateProps {
  stepActive: number
  stepTitle: string[]
  completeOfficial: CompleteProps
  pinCodeToken: string
}

interface CompleteProps {
  title: string
  describe: string
  login: boolean
}
