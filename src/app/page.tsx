import { supabase } from '@/services/supabaseClient';

const Home = async () => {
  const data = await supabase.from('test').select('*');
  console.log(data);
  return <div className="text-sub1 text-xl">1석이조</div>;
};

export default Home;
