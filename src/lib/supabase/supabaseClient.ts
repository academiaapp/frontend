import type { Database } from '../supabase.types';
import { Compare, EQ } from './compare';

import { svelteSupabase } from './supaStore';
export const supabase = new svelteSupabase<Database>(
	'https://khpnlpgmzmocwqjkvemv.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtocG5scGdtem1vY3dxamt2ZW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4NDIwNTIsImV4cCI6MjAzMzQxODA1Mn0.PfFI_eQ5qU6t9mlFUePdnVJHX6Xqt0UDAdUsTXWCPDI'
);

supabase.auth.onAuthStateChange((event, session) => {
	console.log('auth change', event, session);
});

const documents = supabase.store('document');
documents.deafults = () => ({
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	name: 'Unavngivet'
});

// await documents.insert({
// 	content: 'Hello, World!',
// 	isNote: true,
// 	created_at: '',
// 	id: '0',
// 	name: 'Test doc'
// });

// console.log(documents.getData());

const d1 = { a: 1, b: 2, c: -1 };
const d2 = { a: 1, b: 4, d: 10 };
const d3 = { ...d1, ...d2 };
console.log(d3);

// console.log(await documents.insert({}));
const comp = new EQ('id', '0') as Compare;
console.log(comp.checkRow({ id: '0' }));
console.log(comp.check('0'));
