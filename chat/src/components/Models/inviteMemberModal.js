import React, { useState, useContext } from "react";
import { Modal, Form, Select, Spin, Avatar } from "antd";
import { AppContext } from "../context/AppProvider";
import { AuthContext } from "../context/AuthProvider";
import { addDocument } from "../firebase/service";
import { debounce } from "lodash";
import { db } from "../firebase/config";
import { query, collection, where,limit, getDocs, doc, updateDoc } from 'firebase/firestore';


function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, props.curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.label.charAt(0)?.toUpperCase()}
          </Avatar>
          {opt.label}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, curMembers) {
  const q = query(collection(db, "users"), where("keywords", "array-contains", search), limit(20));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs
    .map(doc => ({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL
    }))
    .filter(opt => !curMembers.includes(opt.value)); // Fixed to exclude current members
}

export default function InviteMemberModal() {
  const { isInviteMemberVisible, setIsInviteMemberVisible,selectedRoomId,selectedRoom } =
    useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();

  const handleOk = async () => {
    form.resetFields();
  
    const roomRef = doc(db, 'rooms', selectedRoomId);
  
    await updateDoc(roomRef, {
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });
  
    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    setIsInviteMemberVisible(false);
  };

  console.log({value})

  return (
    <div>
      <Modal
        title="Invite Members"
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="name of member"
            value={value}
            placeholder="Enter the name of member"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            curMembers={selectedRoom.members}
          />
        </Form>{" "}
      </Modal>{" "}
    </div>
  );
}
