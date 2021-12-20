export const toTreeData = (
  datas: any,
  keyName: string,
  titlName: string,
  childrenName: string,
) => {
  return datas?.map((data: any) => {
    let children = toTreeData(
      data[childrenName],
      keyName,
      titlName,
      childrenName,
    );
    return {
      key: data[keyName],
      title: data[titlName],
      children: children,
    };
  });
};

export const toListData = (datas: any, codeName: string, nameName: string) => {
  return datas?.map((data: any) => {
    return { code: data[codeName], name: data[nameName] };
  });
};
