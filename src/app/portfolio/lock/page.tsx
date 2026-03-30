import { LockForm } from './LockForm'

export default async function LockPage({
  searchParams,
}: {
  searchParams: Promise<{ return?: string }>
}) {
  const { return: returnUrl } = await searchParams
  return <LockForm returnUrl={returnUrl ?? '/portfolio'} />
}
