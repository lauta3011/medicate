import { supabase } from '@/database/index';
import { City, Department, Service } from '@/types';

export const fetchDepartment = async (): Promise<Department[] | null> => {
  try {
    // Fetch all departments that have at least one city
    const { data, error } = await supabase
      .from('department')
      .select(`
        id,
        name,
        city!from_department(id)
      `)
      .not('city', 'is', null);
    
    if (error) {
      console.error('Error fetching departments with cities:', error);
      return null;
    }

    // Remove duplicates and clean up the data structure
    const uniqueDepartments = data?.reduce((acc, dept) => {
      // Check if department already exists in accumulator
      const exists = acc.find(d => d.id === dept.id);
      if (!exists && dept.city && dept.city.length > 0) {
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

export const fetchCities = async (department: { id: number; name: string }): Promise<City[] | null> => {
  try {
    if (!department?.id) {
      console.warn('Department ID is required to fetch cities');
      return null;
    }

    const { data, error } = await supabase
      .from('city')
      .select(`
        id,
        name,
        from_department
      `)
      .eq('from_department', department.id)
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Error fetching cities:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in fetchCities:', error);
    return null;
  }
};

export const fetchServices = async (): Promise<Service[] | null> => {
  try {
    const { data, error } = await supabase
      .from('service')
      .select(`
        id,
        name
      `)
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Error fetching services:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in fetchServices:', error);
    return null;
  }
};

// Additional helper function to fetch departments with their cities
export const fetchDepartmentsWithCities = async (): Promise<(Department & { cities: City[] })[] | null> => {
  try {
    const { data, error } = await supabase
      .from('department')
      .select(`
        id,
        name,
        city!from_department(
          id,
          name,
          from_department
        )
      `)
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Error fetching departments with cities:', error);
      return null;
    }

    // Transform the data to have a cleaner structure
    const departmentsWithCities = data?.map(dept => ({
      id: dept.id,
      name: dept.name,
      cities: dept.city || []
    })) || [];

    return departmentsWithCities;
  } catch (error) {
    console.error('Error in fetchDepartmentsWithCities:', error);
    return null;
  }
};  