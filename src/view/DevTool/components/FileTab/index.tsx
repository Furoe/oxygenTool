interface Props {
  tabNames: string[];
  activeTab: string;
  toggleTab: (fileName: string) => void;
}
/**
 * 1、tab项过多隐藏，支持滚轮滚动左右移动
 * 2、支持拖拽排序
 * 3、支持删除
 * 4、支持主题切换样式切换
 */
function FileTab({ tabNames, activeTab, toggleTab }: Props) {
  const Tabs = (tabNames as string[]).map((item) => (
    <div
      key={item}
      className={`w-44 h-8 text-sm px-4 leading-8 border-y border-r border-slate-700 cursor-pointer hover:bg-slate-700 ${
        activeTab === item ? 'border-b-0 border-t-sky-500 text-white' : ''
      }`}
      onClick={() => toggleTab(item)}
    >
      {item}
    </div>
  ));
  return (
    <>
      <div className="flex w-full bg-vs-dark">{Tabs}</div>
    </>
  );
}

export default FileTab;
