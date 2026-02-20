'use client' // Error boundaries must be Client Components
 
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import BackgroundImg from '../../public/Body_BG.png';

export default function Error() {

    const router = useRouter();
  return (
    <div className='error-wrapper'>
        <Image 
            src={BackgroundImg}
            alt="Background image"
            fill
            priority
            className="object-cover -z-10"
        ></Image>
      <span className='text-2xl'>Something went wrong!</span>
      <button className='error-button'
        onClick={
          () => router.push('/')
        }
      >
        Go Back
      </button>
    </div>
  )
}