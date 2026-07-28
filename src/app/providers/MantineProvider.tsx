import { MantineProvider as MantineBase } from '@mantine/core'

interface Props {
  children: React.ReactNode
}

export function MantineProvider({ children }: Props) {
  return <MantineBase>{children}</MantineBase>
}
