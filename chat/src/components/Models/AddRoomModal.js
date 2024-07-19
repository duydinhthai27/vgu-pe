import React, { useState, useContext } from "react";
import { Modal, Form , Input } from "antd";
import { AppContext } from "../context/AppProvider";
import { AuthContext } from "../context/AuthProvider";
import { addDocument } from "../firebase/service";

export default function AddRoomModal() {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const { user: {uid} } = useContext(AuthContext);
    const [form] = Form.useForm();


    const handleOk = () => {

        console.log({ formData: form.getFieldsValue()});
        addDocument('rooms',{...form.getFieldsValue(), members: [uid]})

        form.resetFields();
        setIsAddRoomVisible(false)
    }

    const handleCancel = () => {
        setIsAddRoomVisible(false)
    }

  return <div>
    <Modal
        title ="Create Room"
        visible ={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
    >
        <Form form={form} layout="vertical">
            <Form.Item label ="Room Name" name='name'>
                <Input placeholder="Enter The Room Name"/>
            </Form.Item>
            <Form.Item label ="Description" name='description'>
                <Input.TextArea placeholder="Enter Description"/>
            </Form.Item>
        </Form>
    </Modal>
  </div>;
}
