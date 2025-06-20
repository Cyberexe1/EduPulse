import React, { useEffect, useRef, useState } from 'react';
import WebcamAttentionTracker from './WebcamAttentionTracker';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, setDoc, doc } from 'firebase/firestore';
import './ConferencePagemodule.css';

declare global {
  interface Window {
    JitsiMeetExternalAPI?: any;
  }
}

// Helper to generate a random user ID
function getRandomId() {
  return 'user_' + Math.random().toString(36).substr(2, 9);
}

const ROOM_NAME = 'EduPulseDemoRoom';

const ConferencePage: React.FC = () => {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const [attention, setAttention] = useState<number>(0);
  const [userId] = useState(getRandomId());
  const [role, setRole] = useState<'teacher' | 'student'>('student');
  const [jitsiApi, setJitsiApi] = useState<any>(null);

  // Assign role: first user in Firestore for this room is teacher
  useEffect(() => {
    async function assignRole() {
      const usersRef = collection(db, 'conferences', ROOM_NAME, 'users');
      const q = query(usersRef, orderBy('joinedAt'), limit(1));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        // First user, set as teacher
        setRole('teacher');
      } else {
        setRole('student');
      }
      // Register this user in Firestore
      await setDoc(doc(usersRef, userId), {
        userId,
        role: snapshot.empty ? 'teacher' : 'student',
        joinedAt: Date.now(),
      });
    }
    assignRole();
    // eslint-disable-next-line
  }, [userId]);

  // Jitsi Meet integration
  useEffect(() => {
    if (window.JitsiMeetExternalAPI && jitsiContainerRef.current) {
      jitsiContainerRef.current.innerHTML = '';
      const domain = 'meet.jit.si';
      const options = {
        roomName: ROOM_NAME,
        parentNode: jitsiContainerRef.current,
        width: '100%',
        height: 600,
        configOverwrite: {},
        interfaceConfigOverwrite: {},
        userInfo: { displayName: userId },
      };
      // @ts-ignore
      const api = new window.JitsiMeetExternalAPI(domain, options);
      setJitsiApi(api);
      return () => {
        api.dispose();
      };
    }
  }, [userId]);

  // Send attention data to Firestore every 30 seconds
  useEffect(() => {
    if (!userId) return;
    const interval = setInterval(async () => {
      try {
        const record = {
          attention,
          timestamp: Date.now(),
          userId,
          role,
        };
        await addDoc(collection(db, 'conferences', ROOM_NAME, 'attentions'), record);
      } catch (e) {
        // Optionally handle error
      }
    }, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [attention, userId, role]);

  // Hidden attention tracker
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ marginBottom: 24 }}>Conference Page</h1>
      <div ref={jitsiContainerRef} id="jitsi-container" style={{ width: '100%', maxWidth: 900, minHeight: 600, background: '#222', borderRadius: 8, overflow: 'hidden' }} />
      {/* Hidden attention tracker */}
      <div style={{ display: 'none' }}>
        <WebcamAttentionTracker onAttentionChange={setAttention} />
      </div>
    </div>
  );
};

export default ConferencePage; 