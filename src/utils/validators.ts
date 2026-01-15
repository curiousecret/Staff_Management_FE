/**
 * Validate name (letters and spaces only)
 */
export function validateName(name: string): string | null {
  if (!name || name.trim().length === 0) {
    return "Name is required";
  }
  if (name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }
  if (name.trim().length > 100) {
    return "Name must be less than 100 characters";
  }
  if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    return "Name must contain only letters and spaces";
  }
  return null;
}

/**
 * Validate staff ID
 */
export function validateStaffId(staffId: string): string | null {
  if (!staffId || staffId.trim().length === 0) {
    return "Staff ID is required";
  }
  if (staffId.trim().length > 20) {
    return "Staff ID must be less than 20 characters";
  }
  return null;
}

/**
 * Validate date of birth (must be 18+)
 */
export function validateDob(dob: string): string | null {
  if (!dob) {
    return "Date of birth is required";
  }

  const birthDate = new Date(dob);
  const today = new Date();
  
  // Calculate age
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 18) {
    return "Staff must be at least 18 years old";
  }

  return null;
}

/**
 * Validate salary
 */
export function validateSalary(salary: string | number): string | null {
  const numSalary = typeof salary === "string" ? parseFloat(salary) : salary;
  
  if (isNaN(numSalary)) {
    return "Salary must be a valid number";
  }
  if (numSalary < 0) {
    return "Salary cannot be negative";
  }
  return null;
}

/**
 * Validate all staff form fields
 */
export interface StaffFormErrors {
  staff_id?: string;
  name?: string;
  dob?: string;
  salary?: string;
}

export function validateStaffForm(data: {
  staff_id: string;
  name: string;
  dob: string;
  salary: string | number;
}): StaffFormErrors {
  const errors: StaffFormErrors = {};

  const staffIdError = validateStaffId(data.staff_id);
  if (staffIdError) errors.staff_id = staffIdError;

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const dobError = validateDob(data.dob);
  if (dobError) errors.dob = dobError;

  const salaryError = validateSalary(data.salary);
  if (salaryError) errors.salary = salaryError;

  return errors;
}
