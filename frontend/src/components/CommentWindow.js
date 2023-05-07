import React, { useEffect , useRef, useState} from "react";
import Comment from './Comment'
import { api } from '../api';
import io from "socket.io-client";
import { useRouter } from "next/router";
import { useAuth } from './authContext';

const CommentWindow = (props) => {
    const [comments , setComments] = useState('');
    const [newComment , setNewComment] = useState('');
    const socket = io.connect("http://localhost:3000");
    const bottomRef = useRef(null);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { user } = useAuth();

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const {data} = await api.ticket.getAllComment(props.ticketId);
                setComments(data);
                setHasError(false);
            }catch(e){
              if(!e.response || !e.response.status || e.response.status===500)
                router.push("/error");
              else if(e.response.status===401 )
              {
                localStorage.clear();
                router.push("/login");
              }else{
                setHasError(true);
                setError(e.response.data);
              }
            }
        }
        socket.emit('ticket_open', {ticketId:props.ticketId});
        fetchData();
    },[])

    useEffect(() =>{
        const fetchData = async()=>{
            try{
                const {data} = await api.ticket.getAllComment(props.ticketId);
                setComments(data);
                setHasError(false);
            }catch(e){
              if(!e.response || !e.response.status || e.response.status===500)
                router.push("/error");
              else if(e.response.status===401 )
              {
                localStorage.clear();
                router.push("/login");
              }else{
                setHasError(true);
                setError(e.response.data);
              }
            }
        }
        socket.on("recieve_ticket_updates", () => {
            fetchData();
        });
    }, [socket])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const comment = {
            sender : user.email,
            ticketId : props.ticketId,
            text : newComment
        };
        try{
            const res = await api.ticket.createComment(props.ticketId, comment);
            socket.emit("ticket_update",{ticketId:props.ticketId});
            setComments([...comments,res.data]);
            setNewComment("")
            setHasError(false);
        }catch(e){
            if(!e.response || !e.response.status || e.response.status===500)
                router.push("/error");
            else if(e.response.status===401 )
            {
                localStorage.clear();
                router.push("/login");
            }else{
                setHasError(true);
                setError(e.response.data);
            }
        }
    }

  return (
    <div>
        {hasError && <div className="error">{error}</div>}
        <div>
            <div>
                {comments && comments.map((m, index) => ( 
                comments.length-1 === index ? <div ref={bottomRef} key={index}>
                <Comment comment={m} own={m.sender === user.email} />
                </div>
                :
                <div key={index}>
                <Comment comment={m} own={m.sender === user.email} />
                </div>
                ))}
            </div>
            <div>
                <label htmlFor="comment" hidden></label>
                <textarea
                    placeholder="write something..."
                    onChange={ (e) => setNewComment(e.target.value)}
                    value={newComment}
                    id="comment"
                    className="loginInput form-control"
                ></textarea>
                <button onClick={handleSubmit} className="btn btn-primary">
                    Send
                </button>
            </div>
        </div>
    </div>
  )
}

export default CommentWindow