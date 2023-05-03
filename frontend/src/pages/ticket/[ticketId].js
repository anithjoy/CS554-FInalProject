import EditTicket from '@/components/EditTicket';
import { useRouter } from "next/router";

const Ticket = () => {
  const router = useRouter();
  return (
    <div className='ticketPage'>
        <EditTicket ticketId={router.query.ticketId}/>
    </div>
  )
}

export default Ticket