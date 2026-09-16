/**
 * Zustand Global Store for Kugi.ph
 * Manages Dual-Role mode toggle (Buyer vs Freelancer),
 * 4-Cluster selector filter, active orders, and real-time escrow mutations.
 */

import { create } from "zustand";
import { ActiveContractOrder, INITIAL_ORDERS, MOCK_SERVICES, MarketplaceService } from "./mock-data";
import { transitionMilestone, MilestoneStatus } from "./escrow-engine";
import { scanMessageForDisintermediation } from "./anti-scam-regex";

export type UserRole = "BUYER" | "FREELANCER";

interface KugiStoreState {
  activeRole: UserRole;
  selectedCluster: string;
  searchQuery: string;
  orders: ActiveContractOrder[];
  services: MarketplaceService[];
  activeOrderId: string;
  antiScamAlertTriggered: boolean;
  lastScamWarning?: string;
  
  // Actions
  toggleRole: () => void;
  setRole: (role: UserRole) => void;
  setSelectedCluster: (cluster: string) => void;
  setSearchQuery: (query: string) => void;
  setActiveOrderId: (orderId: string) => void;
  
  // Escrow mutations
  fundMilestone: (orderNumber: string, sequenceOrder: number) => void;
  submitDeliverable: (orderNumber: string, sequenceOrder: number, fileName: string) => void;
  requestRevision: (orderNumber: string, sequenceOrder: number, notes: string) => void;
  approveMilestone: (orderNumber: string, sequenceOrder: number) => void;
  fileDispute: (orderNumber: string, sequenceOrder: number, reason: string) => void;
  
  // Chat messaging & Anti-Scam Shield
  sendMessage: (orderNumber: string, text: string) => void;
  dismissScamAlert: () => void;
}

export const useKugiStore = create<KugiStoreState>((set, get) => ({
  activeRole: "FREELANCER",
  selectedCluster: "all",
  searchQuery: "",
  orders: INITIAL_ORDERS,
  services: MOCK_SERVICES,
  activeOrderId: "KG-90241",
  antiScamAlertTriggered: false,
  lastScamWarning: undefined,

  toggleRole: () =>
    set((state) => ({
      activeRole: state.activeRole === "BUYER" ? "FREELANCER" : "BUYER",
    })),

  setRole: (role) => set({ activeRole: role }),

  setSelectedCluster: (cluster) => set({ selectedCluster: cluster }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setActiveOrderId: (orderId) => set({ activeOrderId: orderId }),

  fundMilestone: (orderNumber, sequenceOrder) => {
    set((state) => {
      const updatedOrders = state.orders.map((ord) => {
        if (ord.orderNumber !== orderNumber) return ord;
        const updatedMilestones = ord.milestones.map((m) => {
          if (m.sequenceOrder !== sequenceOrder) return m;
          return transitionMilestone(m, { type: "FUND_DEPOSIT" });
        });
        return {
          ...ord,
          milestones: updatedMilestones,
          chatHistory: [
            ...ord.chatHistory,
            {
              id: `sys-${Date.now()}`,
              sender: "SYSTEM" as const,
              senderName: "Kugi Escrow Engine",
              text: `Milestone ${sequenceOrder} Escrow Deposit funded into isolated trust account via GCash/Maya rails.`,
              timestamp: "Just now",
              isSystemAlert: true,
            },
          ],
        };
      });
      return { orders: updatedOrders };
    });
  },

  submitDeliverable: (orderNumber, sequenceOrder, fileName) => {
    set((state) => {
      const updatedOrders = state.orders.map((ord) => {
        if (ord.orderNumber !== orderNumber) return ord;
        const updatedMilestones = ord.milestones.map((m) => {
          if (m.sequenceOrder !== sequenceOrder) return m;
          return transitionMilestone(m, {
            type: "SUBMIT_DELIVERABLE",
            deliverableFileName: fileName,
          });
        });
        return {
          ...ord,
          milestones: updatedMilestones,
          chatHistory: [
            ...ord.chatHistory,
            {
              id: `pro-${Date.now()}`,
              sender: "FREELANCER" as const,
              senderName: ord.freelancerName,
              text: `Submitted deliverable: ${fileName}. 72-Hour Inspection clock initiated.`,
              timestamp: "Just now",
            },
            {
              id: `sys-${Date.now()}`,
              sender: "SYSTEM" as const,
              senderName: "Kugi Escrow Engine",
              text: `Deliverable SHA-256 Checksum verified. Client has 72 hours to review and accept or request revision.`,
              timestamp: "Just now",
              isSystemAlert: true,
            },
          ],
        };
      });
      return { orders: updatedOrders };
    });
  },

  requestRevision: (orderNumber, sequenceOrder, notes) => {
    set((state) => {
      const updatedOrders = state.orders.map((ord) => {
        if (ord.orderNumber !== orderNumber) return ord;
        const updatedMilestones = ord.milestones.map((m) => {
          if (m.sequenceOrder !== sequenceOrder) return m;
          return transitionMilestone(m, { type: "REQUEST_REVISION", notes });
        });
        return {
          ...ord,
          milestones: updatedMilestones,
          chatHistory: [
            ...ord.chatHistory,
            {
              id: `buyer-${Date.now()}`,
              sender: "BUYER" as const,
              senderName: ord.buyerName,
              text: `Requested Revision: ${notes}`,
              timestamp: "Just now",
            },
            {
              id: `sys-${Date.now()}`,
              sender: "SYSTEM" as const,
              senderName: "Kugi Escrow Engine",
              text: `Inspection clock paused. Milestone status set to REVISION_REQUESTED.`,
              timestamp: "Just now",
              isSystemAlert: true,
            },
          ],
        };
      });
      return { orders: updatedOrders };
    });
  },

  approveMilestone: (orderNumber, sequenceOrder) => {
    set((state) => {
      const updatedOrders = state.orders.map((ord) => {
        if (ord.orderNumber !== orderNumber) return ord;
        const updatedMilestones = ord.milestones.map((m) => {
          if (m.sequenceOrder !== sequenceOrder) return m;
          return transitionMilestone(m, { type: "APPROVE_DELIVERABLE" });
        });
        return {
          ...ord,
          milestones: updatedMilestones,
          chatHistory: [
            ...ord.chatHistory,
            {
              id: `buyer-${Date.now()}`,
              sender: "BUYER" as const,
              senderName: ord.buyerName,
              text: `Deliverable approved. Excellent work!`,
              timestamp: "Just now",
            },
            {
              id: `sys-${Date.now()}`,
              sender: "SYSTEM" as const,
              senderName: "Kugi Escrow Engine",
              text: `Milestone ${sequenceOrder} Approved! Net funds disbursed to GCash. 0.5% BIR Form 2307 Creditable Withholding Tax automated under BIR RR 16-2023.`,
              timestamp: "Just now",
              isSystemAlert: true,
            },
          ],
        };
      });
      return { orders: updatedOrders };
    });
  },

  fileDispute: (orderNumber, sequenceOrder, reason) => {
    set((state) => {
      const updatedOrders = state.orders.map((ord) => {
        if (ord.orderNumber !== orderNumber) return ord;
        const updatedMilestones = ord.milestones.map((m) => {
          if (m.sequenceOrder !== sequenceOrder) return m;
          return transitionMilestone(m, { type: "FILE_DISPUTE", reason });
        });
        return {
          ...ord,
          status: "DISPUTED" as const,
          milestones: updatedMilestones,
          chatHistory: [
            ...ord.chatHistory,
            {
              id: `dispute-${Date.now()}`,
              sender: "SYSTEM" as const,
              senderName: "Kugi Mediation Desk",
              text: `DISPUTE LODGED: ${reason}. Escrow funds frozen. Ticket routed to Kugi Provincial Mediation Desk in Mankilam, Tagum City. 48-Hour direct negotiation window opened.`,
              timestamp: "Just now",
              isSystemAlert: true,
              severity: "CRITICAL" as const,
            },
          ],
        };
      });
      return { orders: updatedOrders };
    });
  },

  sendMessage: (orderNumber, text) => {
    const scan = scanMessageForDisintermediation(text);
    const { activeRole } = get();

    set((state) => {
      const updatedOrders = state.orders.map((ord) => {
        if (ord.orderNumber !== orderNumber) return ord;
        const sender = activeRole;
        const senderName = activeRole === "BUYER" ? ord.buyerName : ord.freelancerName;

        const newMessages = [
          ...ord.chatHistory,
          {
            id: `msg-${Date.now()}`,
            sender,
            senderName,
            text,
            timestamp: "Just now",
          },
        ];

        // If off-platform contact or scam attempt detected, post system warning banner
        if (scan.isSuspicious) {
          newMessages.push({
            id: `alert-${Date.now()}`,
            sender: "SYSTEM" as const,
            senderName: "Anti-Disintermediation Shield",
            text: `SIGNAL CRIMSON WARNING: ${scan.warningMessage}`,
            timestamp: "Just now",
            isSystemAlert: true,
            severity: "CRITICAL" as const,
          });
        }

        return {
          ...ord,
          chatHistory: newMessages,
        };
      });

      return {
        orders: updatedOrders,
        antiScamAlertTriggered: scan.isSuspicious,
        lastScamWarning: scan.warningMessage,
      };
    });
  },

  dismissScamAlert: () => set({ antiScamAlertTriggered: false }),
}));
