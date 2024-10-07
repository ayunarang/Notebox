"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function WorkspaceItemList({ workspaceList, Layout }) {

    const router = useRouter();
    const OnClickWorkspaceItem = (workspaceId) => {
        router.push('/workspace/' + workspaceId)
    }

    return (
        <div className={(Layout === 'Grid') ? `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6` : ' mt-6'}>
            {workspaceList && workspaceList.map((workspace, index) => (
                <div
                    key={index}
                    className={`${Layout === 'List' ? 'mt-6 hover:scale-[1.01]' : 'hover:scale-105'} border shadow-xl rounded-xl transition-all cursor-pointer`}
                    onClick={() => OnClickWorkspaceItem(workspace.id)}
                >
                    <Image src={workspace?.coverImage}
                        width={400} height={200} alt='cover'
                        className='h-[150px] object-cover rounded-t-xl w-full'
                    />
                    <div className='p-4 rounded-b-xl'>
                        <h2 className='flex gap-2'>{workspace?.emoji} {workspace.workspaceName}</h2>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WorkspaceItemList