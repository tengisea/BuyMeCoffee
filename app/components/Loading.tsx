import Image from 'next/legacy/image'

export const Loading = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <Image src="/coffeeLoad.gif" alt="" width={150} height={150} />
        <div className='text-xl font-medium'>Loading</div>
    </div>
  )
}
