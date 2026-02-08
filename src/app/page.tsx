import { redirect } from 'next/navigation';

export default function RootPage() {
  // By default, if the user reaches here (passed proxy), 
  // we send them to the editor.
  redirect('/editor');
}
