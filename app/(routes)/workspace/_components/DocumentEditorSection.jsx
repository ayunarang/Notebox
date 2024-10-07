import React, { useState } from 'react';
import DocumentHeader from './DocumentHeader';
import DocumentInfo from './DocumentInfo';
import RichDocumentEditor from './RichDocumentEditor';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import CommentBox from './CommentBox';

function DocumentEditorSection({ params }) {
  const [openComment, setOpenComment] = useState(false);

  return (
    <div className='relative'>
      <DocumentHeader />
      <DocumentInfo params={params} />
      <RichDocumentEditor params={params} />

      <div className='fixed md:right-10 right-3 bottom-10 z-20'>
        <Button onClick={() => setOpenComment(!openComment)}>
          {openComment ? <X /> : <MessageCircle />}
        </Button>
        
        {openComment && (
            <CommentBox className="fixed right-10 bottom-20"/>
        )}
      </div>
    </div>
  );
}

export default DocumentEditorSection;
