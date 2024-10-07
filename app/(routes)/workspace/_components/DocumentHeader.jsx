import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'

function DocumentHeader() {
  return (
    <div className='flex justify-between items-center p-3 px-7 shadow-md'>
        <div></div>
        <OrganizationSwitcher/>
        <div className='flex gap-2'>
            <Button>Share</Button>
            <UserButton/>
        </div>
    </div>
  )
}

export default DocumentHeader






// import { Button } from '@/components/ui/button';
// import { OrganizationSwitcher, UserButton, useUser } from '@clerk/nextjs';
// import React, { useEffect, useState } from 'react';
// import { toast } from 'sonner';
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'; 
// import { CopyIcon } from 'lucide-react'; 
// import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
// import { db } from '@/config/firebaseConfig';


// function DocumentHeader({ params }) { 
//   const [shareUrl, setShareUrl] = useState('');
//   const [showShareMenu, setShowShareMenu] = useState(false);
//   const [DocumentData, setDocumentData] = useState(null);
//   const { user } = useUser();
//   const [isSharedDocument, setisSharedDocument] = useState(false);
//   const [isOwner, setisOwner] = useState(false);
//   const [accessChange, setAccessChange] = useState(null);
//   const [emailInput, setEmailInput] = useState('');


//   const GetDocumentPermissions = async () => {
//     const docRef = doc(db, 'workspaceDocuments', params.documentid); 
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//         const data = docSnap.data();
//         setDocumentData({
//             createdBy: data.createdBy,
//             permissions: data.permissions
//         });
//     } else {
//         console.log('No such document!');
//     }
// };

// useEffect(() => {
//     if (params && user) {
//         GetDocumentPermissions();
//     }
// }, [params, user]);


// useEffect(() => {
//     if (DocumentData) {
//         console.log(DocumentData?.createdBy);
//         if (DocumentData.createdBy === user?.primaryEmailAddress?.emailAddress) {
//             setisOwner(true);
//         }
//         if (Object.keys(DocumentData.permissions || {}).length > 1) {
//             setisSharedDocument(true);
//         }
//     }
// }, [DocumentData]);


//   const GetDocumentUrl = () => {
//     const documentUrl = `${window.location.origin}/workspace/${params.workspaceid}/${params.documentid}`;
//     setShareUrl(documentUrl);
//   };

//   const handleShare = async () => {
//     GetDocumentUrl();
//     await navigator.clipboard.writeText(shareUrl);
//     toast.success('Document link copied to clipboard!');
//   };

//   const handleAccessChange = async (accessType) => {
//     if (emailInput.trim() === '') {
//       toast.error('Please enter a valid email address.');
//       return;
//     }

//     const docRef = doc(db, 'workspaceDocuments', params.documentid);
//     try {
//       await updateDoc(docRef, {
//         [`permissions.${emailInput.trim()}`]: accessType, 
//       });

//       setAccessChange(accessType); 
//       toast.success(`Access changed to ${accessType} for ${emailInput.trim()}`);
//     } catch (error) {
//       console.error("Error updating document: ", error);
//       toast.error('Failed to update access permissions.');
//     }
//   };

//   return (
//     <div className='flex justify-between items-center p-3 px-7 shadow-md'>
//       <div></div>
//       <OrganizationSwitcher />
//       <div className='flex gap-2'>
//         {isOwner && (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button onClick={() => setShowShareMenu(!showShareMenu)}>Share</Button>
//             </DropdownMenuTrigger>
//             {showShareMenu && (
//               <DropdownMenuContent>
//                 <div className='flex flex-col p-2'>
//                   <input 
//                     type="email" 
//                     value={emailInput} 
//                     onChange={(e) => setEmailInput(e.target.value)} 
//                     placeholder="Enter email to share" 
//                     className='p-1 border rounded mb-2'
//                   />
//                   <span className='text-sm'>{(!accessChange) ? 'Set access control first..' : shareUrl}</span>
//                   <Button 
//                     disabled={!accessChange}
//                     variant='outline' 
//                     className='flex items-center gap-1'
//                     onClick={handleShare} 
//                   >
//                     <CopyIcon 
//                       disabled={!accessChange}
//                       size={16} 
//                     /> 
//                     Copy
//                   </Button>
//                 </div>
//                 <div className='mt-2'>
//                   <DropdownMenuItem onClick={() => handleAccessChange('read')}>Read Access</DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => handleAccessChange('edit')}>Edit Access</DropdownMenuItem>
//                   {isSharedDocument && ( 
//                     <DropdownMenuItem onClick={() => handleAccessChange('stop')}>Stop Access</DropdownMenuItem>
//                   )}
//                 </div>
//               </DropdownMenuContent>
//             )}
//           </DropdownMenu>
//         )}
//         <UserButton />
//       </div>
//     </div>
//   );
// }

// export default DocumentHeader;
