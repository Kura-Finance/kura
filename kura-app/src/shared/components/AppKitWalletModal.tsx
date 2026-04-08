import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface AppKitWalletModalProps {
  isVisible: boolean;
  onClose: () => void;
}

/**
 * Temporary placeholder - AppKit integration deferred
 * Real implementation will be added when Valtio compatibility is resolved
 */
export default function AppKitWalletModal({ isVisible, onClose }: AppKitWalletModalProps) {
  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0B0F' }}>
        <View style={{ flex: 1, padding: 20 }}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>
              Connect Web3 Wallet
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Info */}
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 14, color: '#FFFFFF', marginBottom: 12 }}>
                Web3 wallet integration coming soon!
              </Text>
              <Text style={{ fontSize: 12, color: '#999999' }}>
                We&apos;re resolving technical compatibility issues with Valtio and Expo. This feature will be available in the next update.
              </Text>
            </View>
          </ScrollView>

          {/* Footer */}
          <TouchableOpacity
            onPress={onClose}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 12,
              backgroundColor: '#8B5CF6',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600' }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
