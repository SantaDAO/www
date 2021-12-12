import ProgressBar from "../components/ProgressBar";
import MoneyRaised from "../components/MoneyRaised";
import Meta from "../components/Meta";
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  // these values need to be pulled from a server that can interact w/ the blockchain. I've already written the code, just need to get an API key.
  const eth = 21.55
  const dollarGoal = 1_000_000
  const conversionRate = 4450.67

  const [progress, setProgress] = useState(((eth * conversionRate) / dollarGoal) * 100)
  const [loading, setLoading] = useState(true)

  return (
    <main>
      <Meta />
      <nav>
        <Image alt="tree" width="40" height="40" src="/tree.png" />
        <a target="_blank" rel="noreferrer" className="outlined discord" href="https://join.elfdao.com">
          {t('home.join')} <Image alt="discord logo" src="/discord.svg" width="25" height="25" />
        </a>
      </nav>
      <header>
        <h1 className="masthead">
          {t.rich('home.tagline', { br: () => <br />})}
        </h1>
        <div className="progress">
          <p>{progress.toFixed(0)}%</p>
          <Image alt="gift" src="/gift.png" width="100" height="100" />
        </div>
        <ProgressBar percent={progress}/>
        <MoneyRaised eth={eth} dollarGoal={dollarGoal} conversionRate={conversionRate} />
        <a target="_blank" rel="noreferrer" className="outlined contribute" href="https://juicebox.money/#/p/santa">
          {t('home.contribute')}
        </a>
      </header>
      <article>
        <p className="manifesto" style={{marginBottom: '2rem'}}>
          {t.rich('home.manifesto', {
            strong: (children) => <strong>{children} </strong>,
          })}
        </p>
        <p className="manifesto">
          {t.rich('home.why', {
            strong: (children) => <strong>{children} </strong>,
          })}
        </p>
      </article>
    </main>
  );
}

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
}
