import Meta from "../components/Meta";
import { useTranslations } from 'next-intl';
import Navigation from "../components/Navigation";
import Progress from "../components/Progress";
import Nft from "../components/NftCard";
import { Grid } from "@material-ui/core";

export default function Home() {
  const t = useTranslations();
  return (
    <main>
      <Meta />
      <Navigation />
      <br></br>
      <header>
        <h1 className="masthead">
          {t.rich('home.tagline', { br: () => <br />})}
        </h1>
        <Progress />
      </header>
      <article>
        <p className="manifesto center" style={{marginBottom: '2rem'}}>
          {t.rich('home.manifesto', {
            strong: (children) => <strong>{children} </strong>,
          })}
        </p>
        <p className="manifesto center">
          {t.rich('home.why', {
            strong: (children) => <strong>{children} </strong>,
          })}
        </p>
      </article>
      <Grid container spacing={3} direction="row">
        <Grid item>
          <Nft name={t('nft.elf')} value={'> 0.1'} />
        </Grid>
        <Grid item>
          <Nft name={t('nft.reindeer')} value={'> 0.5'} />
        </Grid>
        <Grid item>
          <Nft name={t('nft.santa')} value={'Top 5 Contributers'} />
        </Grid>
      </Grid>
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
