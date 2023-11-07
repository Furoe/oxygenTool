import Card from '@/view/components/Card';
import { toolList } from './mock';

function Home() {
  const cardList = toolList.map((item) => (
    <Card key={item.id} {...item}></Card>
  ));
  return (
    <>
      <div>
        <div className="w-10/12 m-auto mt-6 flex">
          <div className="flex flex-wrap gap-4 justify-center">{cardList}</div>
        </div>
      </div>
    </>
  );
}

export default Home;
