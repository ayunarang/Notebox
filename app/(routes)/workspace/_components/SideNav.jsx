"use client"

import React, { useState, useEffect } from 'react'
import Logo from '@/app/_components/Logo'
import { Bell, ChevronsLeft, ChevronsRight, Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { db } from '@/config/firebaseConfig'
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import uuid4 from 'uuid4'
import NotifiationBox from './NotifiationBox'
import DocumentList from './DocumentList'

const MAX_FILE = process.env.NEXT_PUBLIC_MAX_FILE_COUNT;

function SideNav({ params }) {
    const [documentList, setDocumentList] = useState([]);
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        params && GetDocumentList();
        if(!params?.documentid){
            setIsSidebarOpen(true);
        }
    }, [params]);

    const GetDocumentList = () => {
        const q = query(collection(db, 'workspaceDocuments'), where('workspaceId', '==', Number(params?.workspaceid)));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setDocumentList([]);

            querySnapshot.forEach((doc) => {
                setDocumentList(documentList => [...documentList, doc.data()]);
                console.log(doc.data());
            });
        });
    };

    const CreateNewDocument = async () => {
        if (DocumentList?.length >= MAX_FILE) {
            toast("Upgrade to add new file", {
                description: "You reached the max file count. Please upgrade for unlimited file creation.",
                action: {
                    label: "Upgrade",
                    onClick: () => console.log("Upgrade"),
                },
            });
            return;
        }

        setLoading(true);
        const docId = uuid4();
        await setDoc(doc(db, 'workspaceDocuments', docId.toString()), {
            workspaceId: Number(params?.workspaceid),
            createdBy: user?.primaryEmailAddress?.emailAddress,
            coverImage: null,
            emoji: null,
            id: docId,
            documentName: 'Untitled Document',
            documentOutput: [],
        });

        await setDoc(doc(db, 'documentOutput', docId.toString()), {
            docId: docId,
            output: [],
        });

        setLoading(false);
        router.replace('/workspace/' + params?.workspaceid + "/" + docId);
    };

    return (
        <div>
            <div className=' fixed left-2 z-30 my-auto flex items-center justify-center h-screen'>
                <ChevronsRight className=" w-6 h-6 cursor-pointer" onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                }} />
            </div>

            <div
                className={`fixed bg-blue-50 h-screen md:w-72 w-96 shadow-md p-5 transition-transform duration-300 z-50
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className='flex justify-between items-center'>
                    <Logo />
                    <NotifiationBox>
                        <Bell className='h-5 w-5 text-gray-500' />
                    </NotifiationBox>
                </div>

                <hr className='my-5' />

                <div>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-medium'>Workspace Name</h2>
                        <Button size="sm" className="text-lg" onClick={CreateNewDocument}>
                            {loading ? <Loader2Icon className='h-4 w-4 animate-spin' /> : '+'}
                        </Button>
                    </div>
                </div>

                <DocumentList documentList={documentList} params={params} />

                <div className='absolute bottom-10 w-[85%]'>
                    <Progress value={(documentList?.length / MAX_FILE) * 100} />
                    <h2 className='text-sm font-light my-2'>
                        <strong>{documentList?.length}</strong> Out of <strong>{MAX_FILE}</strong> files used
                    </h2>
                    <h2 className='text-sm font-light '>Upgrade your plan for unlimited access</h2>
                </div>
                {(isSidebarOpen) ? <div className='fixed right-2 z-30 my-auto flex items-center justify-center h-screen md:hidden '>
                <ChevronsLeft className=" w-6 h-6 cursor-pointer" onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                }} />
            </div> : ''}
            </div>


        </div>
    )
}

export default SideNav;
