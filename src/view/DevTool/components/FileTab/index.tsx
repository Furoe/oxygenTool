interface Props {
  tabNames: string[];
  activeTab: string;
}
function FileTab({ tabNames, activeTab }: Props) {
  console.log(tabNames);
  const Tabs = (tabNames as string[]).map((item) => <div>{item}</div>);
  return (
    <>
      <div>{Tabs}</div>
    </>
  );
}

export default FileTab;
