import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { auth } from "../firebase/config";
import { AuthContext } from "./AuthProvider"
import useFirestore from "../../hooks/useFirestore";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [selectedRoomId,setSelectedRoomId] = useState('');

    const { user: {uid} } = React.useContext(AuthContext);

  const roomsCondition = React.useMemo(() =>{
    return{
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid
    }
  }, [uid])

  const rooms = useFirestore('rooms',{
    fieldName: 'members',
    operator: 'array-contains',
    compareValue: uid
  });

  console.log({ rooms });

  const selectedRoom = React.useMemo(() => rooms.find(room => room.id === selectedRoomId) || {}, [rooms, selectedRoomId]);

  const usersCondition = React.useMemo(() =>{
    return{
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members,
    }
  }, [selectedRoom.members])

  const members = useFirestore('users',usersCondition)

  console.log({members})

  return (
    <AppContext.Provider value={{ rooms,members,selectedRoom ,isAddRoomVisible, setIsAddRoomVisible,selectedRoomId,setSelectedRoomId,isInviteMemberVisible, setIsInviteMemberVisible }}>
      {children}
    </AppContext.Provider>
  );
}
