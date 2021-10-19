import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import Link from 'next/link';
import { useRouter } from "next/router";
import qs from 'qs';
import { API_URL } from '@/config/index';

export default function Search({ events }) {
  const router = useRouter();

  return (
    <Layout title='Eventor | Search Results'>
      <Link href='/events'>Go Back</Link>
      <h1>Search results for {router.query.term}</h1>

      { events.length === 0 && <h3>No events to display</h3> }

      {
        events.map(event => (
          <EventItem key={event.id} event={event} />
        ))
      } 

      {
          events.length > 0 && (
              <Link href='/events'>
                  <a className="btn-secondary">View All Events</a>
              </Link>
          )
      }
    </Layout>
  )
}

export async function getServerSideProps({ query: { term } }) {
  // search one field
//   const res = await fetch(`${API_URL}/events?name_contains=${term}`);

  const query = qs.stringify({
      _where: {
          _or: [
              { name_contains: term },
              { performers_contains: term },
              { description_contains: term },
              { venue_contains: term },
          ]
      }
  })
  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1
  }
}
