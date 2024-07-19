import React from "react";
import { Collapse, Typography, Button } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/AuthProvider";
import useFirestore from "../../hooks/useFirestore";
import { AppContext } from "../context/AppProvider";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId} = React.useContext(AppContext);
  console.log({ rooms });

  const handleAddRoonm = () =>{
    setIsAddRoomVisible(true)

  }
  // const { user: {uid} } = React.useContext(AuthContext);

  // const roomsCondition = React.useMemo(() =>{
  //   return{
  //     fieldName: 'members',
  //     operator: 'array-contains',
  //     compareValue: uid
  //   }
  // }, [uid])

  // const rooms = useFirestore('rooms',{
  //   fieldName: 'members',
  //   operator: 'array-contains',
  //   compareValue: uid
  // });

  // console.log({ rooms });
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Room List" key="1">
        {rooms.map((room) => (
          <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>{room.name}</LinkStyled>
        ))}
        <Button type="text" icon={<PlusSquareOutlined />} className="add-room" onClick={handleAddRoonm}>
          Add Room
        </Button>
      </PanelStyled>
    </Collapse>
  );
}
