import { useEffect, useState } from 'react';

const checklistData = [
    {
    section: "One day before launch",
    items: [
      "Charge BlueROV2 battery",
      "Charge topside computer",
      "Charge topside controller",
    ]
  },
  {
    section: "BlueROV2 Battery Setup",
    items: [
      "Remove Pressure Relief Valve (PRV) plug from battery enclosure",
      "Remove locking cord from enclosure end cap",
      "Insert fully charged battery and connect XT90",
      "Push the end cap and flange assembly back onto the tube until it is fully seated",
      "Insert locking cord through end cap",
      "Reinstall the PRV or vent plug back in the bulkhead. Turn the plug clockwise until it stops to seal it"
    ]
  },
  {
    section: "BlueROV2 Cable Setup",
    items: [
      "Connect the tether (yellow) to the spool",
      "Connect the tether (yellow) to the Fathom-X Topside Interface (FXTI)",
      "Connect the FXTI to the topside computer with the USB cable",
      "Check that the  “Power” and “Link” LEDs on the FXTI are lit",
      
    ]
  },
    {
    section: "Topside System Requirements",
    items: [
      "Ethernet connection to BlueROV2 set up",
      "Joystick connection set up",
      "QGroundControl installed",
    ]
  },
    {
    section: "Navigation readiness",
    items: [
      "QgroundControl/Cockpit opened",
      "Camera feed visible",
      "Gyroscope and accelerometer calibrated",
      "Compass calibrated",
      "Joystick enabled, connected, and working",
      "Thruster direction calibrated",
    ]
  },
];

export default function Checklist() {
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('bluerov-checklist');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('bluerov-checklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = (key) => {
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="checklist">
      <h1>BlueROV2 Software Setup</h1>
      {checklistData.map((section, si) => (
        <div key={si}>
          <h2>{section.section}</h2>
          <ul>
            {section.items.map((item, ii) => {
              const key = `${si}-${ii}`;
              return (
                <li key={key}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkedItems[key] || false}
                      onChange={() => toggleItem(key)}
                    />
                    {item}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
