import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [logs, setLogs] = useState<string[]>([]);

  const bootLogs = [
    '[    0.000000] Linux version 5.15.0-root3301 (root@root3301) (gcc version 11.2.0)',
    '[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz root=/dev/sda1 ro quiet',
    '[    0.124578] Kernel command line: BOOT_IMAGE=/boot/vmlinuz root=/dev/sda1 ro quiet',
    '[    0.234891] Dentry cache hash table entries: 262144 (order: 9, 2097152 bytes)',
    '[    0.345672] Mount-cache hash table entries: 4096 (order: 3, 32768 bytes)',
    '[    0.456123] CPU0: Intel(R) Core(TM) i7-9700K CPU @ 3.60GHz',
    '[    0.567234] Performance Events: PEBS fmt3+, Skylake events, 32-deep LBR',
    '[    0.678901] clocksource: tsc: mask: 0xffffffffffffffff max_cycles: 0x33e452fbb3',
    '[    0.789456] Calibrating delay loop... 7200.00 BogoMIPS',
    '[    0.890234] pid_max: default: 32768 minimum: 301',
    '[    0.945678] Security Framework initialized',
    '[    1.023456] SELinux: Initializing.',
    '[    1.134567] Initializing cgroup subsys cpuset',
    '[    1.245678] Initializing cgroup subsys cpu',
    '[    1.356789] Initializing cgroup subsys cpuacct',
    '[    1.467890] NET: Registered protocol family 16',
    '[    1.578901] PCI: Using configuration type 1 for base access',
    '[    1.689012] cryptomgr_test (87) used greatest stack depth: 14528 bytes left',
    '[    1.801234] ACPI: Added _OSI(Module Device)',
    '[    1.912345] ACPI: Added _OSI(Processor Device)',
    '[    2.023456] ACPI: Added _OSI(3.0 _SCP Extensions)',
    '[    2.134567] SCSI subsystem initialized',
    '[    2.245678] usbcore: registered new interface driver usbfs',
    '[    2.356789] PCI: Probing PCI hardware',
    '[    2.467890] NET: Registered protocol family 2',
    '[    2.578901] TCP established hash table entries: 65536',
    '[    2.689012] TCP bind hash table entries: 65536',
    '[    2.801234] TCP: Hash tables configured (established 65536 bind 65536)',
    '[    2.912345] Initializing random number generator... done.',
    '[    3.023456] VFS: Disk quotas dquot_6.6.0',
    '[    3.134567] EXT4-fs (sda1): mounted filesystem with ordered data mode',
    '[    3.245678] Starting system message bus: dbus.',
    '[    3.356789] Starting network interfaces...',
    '[    3.467890] eth0: link up, 1000Mbps, full-duplex',
    '[    3.578901] Starting OpenSSH server: sshd.',
    '[    3.689012] Starting web server: nginx.',
    '[    3.801234] Loading portfolio modules...',
    '[    3.912345] Initializing root3301 services...',
    '[    4.023456] All systems operational.',
    '',
    'root3301 login: root',
    'Password: ********',
    'Last login: Sat Jan  4 00:00:00 UTC 2026',
    '',
    'Welcome to root3301 Portfolio System',
    'Type "help" for more information.',
    '',
    'root@root3301:~$ Starting GUI...'
  ];

  useEffect(() => {
    let currentLog = 0;
    const logInterval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(logInterval);
        setTimeout(onComplete, 800);
      }
    }, 80);

    return () => clearInterval(logInterval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-black text-green-500 flex flex-col p-4 font-mono overflow-auto">
      <div className="w-full max-w-5xl mx-auto">
        <div className="space-y-0">
          {logs.map((log, index) => (
            <div key={index} className="text-xs leading-relaxed whitespace-pre-wrap">
              {log || '\u00A0'}
            </div>
          ))}
          {logs.length > 0 && logs.length < bootLogs.length && (
            <div className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1"></div>
          )}
        </div>
      </div>
    </div>
  );
}
