import { supabase } from '@/database/index';

export const fetchDepartment = async () => {
  const { data, error } = await supabase
    .from('department')
    .select('*');
  
  if (error) console.error('Error fetching data:', error);
  else return data
};

export const fetchCities = async (department: { id: number, name: string }) => {
    const { data, error } = await supabase
      .from('city')
      .select('*')
      .eq('from_department', department?.id);
    
    if (error) console.error('Error fetching data:', error);
    else return data
};

export const fetchServices = async () => {
    const { data, error } = await supabase
      .from('service')
      .select('*')
    
    if (error) console.error('Error fetching data:', error);
    else return data
}  