import { Select } from 'antd';

function Card({ name, desc, versionList }) {
  const v_list = versionList.map((v) => ({ label: v, value: v }));
  return (
    <>
      <div className="w-80 h-52 rounded bg-zinc-50">
        <p className="text-sm text-slate-800 font-nedium">{name}</p>
        <p className="text-sm">{desc}</p>
        <Select defaultValue={versionList[0]} options={v_list} />
      </div>
    </>
  );
}

export default Card;
