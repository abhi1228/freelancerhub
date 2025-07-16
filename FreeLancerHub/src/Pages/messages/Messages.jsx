import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";
import { useUserContext } from "../../context/UserContext";

const Messages = () => {
  const {user}=useUserContext()
const currentUser = user;
console.log("conversation message of current user",currentUser);

const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
       {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <thead>
            <tr>
            <th>{currentUser.isSeller ? "Buyer" : "Sellerss"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            {data.length ? data.map((c) => (
              <tr
                className={
                  ((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) &&
                  "active"
                }
                key={c.id}
              >
                <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                <td>
                  <Link to={`/message/${c.id}`} className="link">
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) && (
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))
          :<tr>No Message Yet</tr>
          }
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default Messages;