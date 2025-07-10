import React, { useState } from 'react';
import { SupportTicketHistory } from '@/components/SupportTicketHistory/SupportTicketHistory';
import SupportModal from '@/components/SupportModal';

const SupportTicketHistoryPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <SupportTicketHistory onRaiseTicket={() => setShowModal(true)} />
            <SupportModal open={showModal} onOpenChange={setShowModal} />
        </div>
    );
};

export default SupportTicketHistoryPage; 