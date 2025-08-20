import { supabase } from '@/database/index';

export const fetchDepartment = async () => {
  try {
    // Using INNER JOIN to get only departments that have cities
    const { data, error } = await supabase
      .from('department')
      .select(`
        *,
        city!inner(id)
      `);
    
    if (error) {
      console.error('Error fetching departments with cities:', error);
      return null;
    }

    // Remove duplicates and clean up the data structure
    const uniqueDepartments = data?.reduce((acc, dept) => {
      // Check if department already exists in accumulator
      const exists = acc.find(d => d.id === dept.id);
      if (!exists) {
        // Remove the nested city data from the department object
        const { city, ...cleanDept } = dept;
        acc.push(cleanDept);
      }
      return acc;
    }, [] as any[]) || [];

    return uniqueDepartments;
  } catch (error) {
    console.error('Error in fetchDepartment:', error);
    return null;
  }
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