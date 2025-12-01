import useBaseUrl from '@docusaurus/useBaseUrl';
import {useEffect} from 'react';
import {useHistory} from '@docusaurus/router';

export default function Home(): JSX.Element {
  const history = useHistory();
  const baseUrl = useBaseUrl('/');

  useEffect(() => {
    history.replace(baseUrl + 'intro');
  }, [history, baseUrl]);

  return null;
}
