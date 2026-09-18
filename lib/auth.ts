export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  createdAt: string;
};

export type CustomerSession = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

const CUSTOMERS_KEY = "pharmacystore_customers";
const SESSION_KEY = "pharmacystore_session";

function getCustomers(): Customer[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CUSTOMERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Customer[];
  } catch {
    return [];
  }
}

function saveCustomers(customers: Customer[]) {
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
}

export function getSession(): CustomerSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CustomerSession;
  } catch {
    return null;
  }
}

export function setSession(session: CustomerSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function signup(data: {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}): { success: boolean; error?: string; session?: CustomerSession } {
  const customers = getCustomers();
  const exists = customers.find(
    (c) => c.email.toLowerCase() === data.email.toLowerCase()
  );
  if (exists) {
    return { success: false, error: "An account with this email already exists." };
  }

  const newCustomer: Customer = {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email.toLowerCase(),
    phone: data.phone,
    address: data.address,
    password: data.password,
    createdAt: new Date().toISOString(),
  };

  customers.push(newCustomer);
  saveCustomers(customers);

  const session: CustomerSession = {
    id: newCustomer.id,
    name: newCustomer.name,
    email: newCustomer.email,
    phone: newCustomer.phone,
    address: newCustomer.address,
  };
  setSession(session);
  return { success: true, session };
}

export function login(data: {
  email: string;
  password: string;
}): { success: boolean; error?: string; session?: CustomerSession } {
  const customers = getCustomers();
  const customer = customers.find(
    (c) => c.email.toLowerCase() === data.email.toLowerCase()
  );

  if (!customer) {
    return { success: false, error: "No account found with this email." };
  }

  if (customer.password !== data.password) {
    return { success: false, error: "Incorrect password. Please try again." };
  }

  const session: CustomerSession = {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
  };
  setSession(session);
  return { success: true, session };
}

export function logout() {
  clearSession();
}
