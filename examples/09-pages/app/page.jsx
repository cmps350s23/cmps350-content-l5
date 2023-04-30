import Welcome from './components/Welcome'
import Counter from './components/Counter'
import GitHubUsers from './components/GitHubUsers'
import Avatar from './components/Avatar'
import Bulb from './components/Bulb'
import SurahExplorer from './components/SurahExplorer'
import FocusInput from './components/4-UseRef'
import HookTimer from './components/4-UseRef2'

export default function HomePage() {
  return <main>
{/*      <Welcome appName="My 1st Next.js App"></Welcome>
     <SurahExplorer />
     <Bulb />
     <div className='flex-container'>
          <Avatar username="erradi" picName='abdelkarim_erradi02.jpg'/>
          <Avatar username="abdulla-alali" picName='Abdulla_Khalid.jpg'/>
      </div>  
       <Counter startValue={3} />
      */}

      <HookTimer />
      <SurahExplorer />
      <FocusInput />
      <Counter startValue={3} />
      <GitHubUsers />

   </main>
}