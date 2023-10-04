import Image from 'next/image'
import BearCounter from './bearCounter'
import Controls from './controls'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BearCounter />
      <Controls />
    </main>
  )
}
