import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import List from '@editorjs/list';
import NestedList from '@editorjs/nested-list';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import SimpleImage from 'simple-image-editorjs';
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import { TextVariantTune } from '@editorjs/text-variant-tune';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import Paragraph from '@editorjs/paragraph';
import GenerateAITemplate from './GenerateAITemplate';

function RichDocumentEditor({ params }) {
  const ref = useRef();
  let editor;
  const { user } = useUser();
  const [documentOutput, setDocumentOutput] = useState([]);
  let isFetched = false; 
  useEffect(() => {
    if (user) {
      InitEditor();
      GetDocumentOutput();
    }
  }, [user]);

  const SaveDocument = async () => {
    console.log("UPDATE");
    const outputData = await ref.current.save();
    const docRef = doc(db, 'documentOutput', params?.documentid);

    await updateDoc(docRef, {
      output: JSON.stringify(outputData),
      editedBy: user?.primaryEmailAddress?.emailAddress,
    });
  };

  const GetDocumentOutput = () => {
    const docRef = doc(db, 'documentOutput', params?.documentid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.editedBy !== user?.primaryEmailAddress?.emailAddress || !isFetched) {
            try {
              const parsedOutput = data.output ? JSON.parse(data.output) : null;
    
              if (parsedOutput) {
                editor?.render(parsedOutput);
                isFetched = true;
              } else {
                console.log('No output data found');
              }
            } catch (error) {
              console.error('Error parsing document output:', error);
            }
          }
      }
    });

    return () => unsubscribe();
  };

  const InitEditor = () => {
    if (!editor?.current) {
      editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          delimiter: Delimiter,
          paragraph: Paragraph,
          alert: {
            class: Alert,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+A',
            config: {
              alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
              defaultType: 'primary',
              messagePlaceholder: 'Enter something',
            },
          },
          table: Table,
          list: {
            class: List,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+L',
            config: {
              defaultStyle: 'unordered',
            },
          },
          checklist: {
            class: Checklist,
            shortcut: 'CMD+SHIFT+C',
            inlineToolbar: true,
          },
          image: SimpleImage,
          code: {
            class: CodeTool,
            shortcut: 'CMD+SHIFT+P',
          },
        },
        onChange: () => {
          SaveDocument(); 
        },
      });
      ref.current = editor;
    }
  };

  return (
    <div className=''>
      <div id='editorjs' className='w-full md:max-w-[85%]'></div>
      <div className='fixed bottom-10 md:ml-80 left-0 z-10'>
        <GenerateAITemplate setGenerateAIOutput={(output) => editor?.render(output)} />
      </div>
    </div>
  );
}

export default RichDocumentEditor;
