import { useEffect, useState } from 'react';
import { useRequest } from 'Src/utils/useHttp';

const getUrl = (tagId: any, pageSize: number, current: number) =>
  `article/queryAllPublish?pageSize=${pageSize}&current=${current}&tagId=${tagId}`;

export const useFetchArticle = (initialParam: { tagId: any; current: any }, pageSize: number) => {
  const { tagId, current } = initialParam;
  const { state, setUrl } = useRequest(getUrl(tagId, pageSize, current), { data: null }, 'GET');
  const [data, setData] = useState(initialParam);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const { tagId, current } = data;
    setUrl(getUrl(tagId, pageSize, current));
  }, [data, setUrl, pageSize]);
  return { state, setData };
};
