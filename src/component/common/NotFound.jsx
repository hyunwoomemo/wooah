import styled from "@emotion/styled";
import React, { useEffect } from "react";

const NotFound = () => {
  const setZeroAndBeamAppear = () => {
    document.getElementById("number-0-soaking").removeEventListener("animationend", setZeroAndBeamDisappear);
    document.getElementById("number-0-soaking").setAttribute("id", "number-0");
    document.getElementById("UFO-beam-disappear").setAttribute("id", "UFO-beam");

    document.getElementById("number-0").addEventListener("animationend", setZeroAndBeamDisappear);
  };

  const setZeroAndBeamDisappear = () => {
    document.getElementById("number-0").removeEventListener("animationend", setZeroAndBeamDisappear);
    document.getElementById("number-0").setAttribute("id", "number-0-soaking");
    document.getElementById("UFO-beam").setAttribute("id", "UFO-beam-disappear");

    document.getElementById("number-0-soaking").addEventListener("animationend", setZeroAndBeamAppear);
  };
  useEffect(() => {
    document.getElementById("number-0").addEventListener("animationend", setZeroAndBeamDisappear);
  }, []);

  return (
    <Base>
      <svg id="ufo-image" viewBox="0 0 2303 1630" fill="none" xmlns="//www.w3.org/2000/svg">
        <g id="gogo_UFO">
          <path
            id="cloud"
            d="M2303 340.921C2303 152.636 2150.37 0 1962.08 0C1773.79 0 1621.16 152.636 1621.16 340.921C1621.16 363.397 1623.34 385.368 1627.49 406.63C1571.43 446.827 1530.6 506.913 1515.32 576.574C1463.32 518.973 1388.06 482.771 1304.35 482.771C1227.61 482.771 1157.98 513.196 1106.85 562.635C1054.84 504.838 979.449 468.49 895.57 468.49C777.197 468.49 675.737 540.875 633.019 643.791C603.989 633.786 572.833 628.351 540.406 628.351C383.474 628.351 256.254 755.571 256.254 912.503C256.254 966.988 271.595 1017.89 298.182 1061.13C293.531 1060.9 288.854 1060.79 284.146 1060.79C127.22 1060.79 0 1188.01 0 1344.94C0 1501.87 127.22 1629.09 284.152 1629.09C414.988 1629.09 525.168 1540.66 558.195 1420.31C579.267 1425.3 601.246 1427.94 623.845 1427.94C670.796 1427.94 715.087 1416.55 754.109 1396.38C772.205 1464.1 833.98 1513.98 907.405 1513.98C995.034 1513.98 1066.07 1442.95 1066.07 1355.32C1066.07 1320.94 1055.13 1289.11 1036.54 1263.12C1106.05 1248.42 1166.19 1208.31 1206.77 1152.97C1213.41 1234.49 1281.67 1298.58 1364.9 1298.58C1435.64 1298.58 1495.56 1252.29 1516.03 1188.35C1547.15 1205.7 1583 1215.59 1621.16 1215.59C1740.57 1215.59 1837.38 1118.78 1837.38 999.367C1837.38 971.475 1832.09 944.819 1822.48 920.338C1957.42 906.371 2064.32 797.971 2075.97 662.353C2208.25 615.481 2303 489.267 2303 340.921Z"
            fill="#0A0228"
          />
          <path id="UFO-beam" d="M1143.5 497L1509 1474H1143.5H778L1143.5 497Z" fill="#9670BA" />
          <path
            id="4-L"
            d="M1009.41 922.58L993.14 922.958L989.815 1002.82L906.273 1010.2L910.713 924.809L812 927.02L839.356 764.734H909.22L888.892 877.862L913.282 877.125L920.31 737H1000.53L994.973 874.14L1009.39 873.403V922.561L1009.41 922.58Z"
            fill="white"
          />
          <path
            id="number-0"
            d="M1250.25 878.957C1250.25 889.801 1249.04 900.589 1246.64 911.301C1244.24 922.013 1240.74 932.309 1236.19 942.171C1231.64 952.033 1226.05 961.215 1219.47 969.716C1212.88 978.218 1205.34 985.605 1196.84 991.896C1188.34 998.187 1179 1003.12 1168.84 1006.69C1158.68 1010.26 1147.74 1012.05 1136.02 1012.05C1124.31 1012.05 1113.16 1010.26 1102.94 1006.69C1092.72 1003.12 1083.37 998.187 1074.94 991.896C1066.5 985.605 1058.96 978.218 1052.31 969.716C1045.66 961.215 1040.05 952.033 1035.5 942.171C1030.94 932.309 1027.45 921.994 1025.05 911.206C1022.65 900.419 1021.44 889.669 1021.44 878.957C1021.44 868.245 1022.65 857.458 1025.05 846.613C1027.45 835.769 1030.93 825.416 1035.5 815.554C1040.05 805.692 1045.66 796.492 1052.31 787.915C1058.96 779.356 1066.52 771.932 1074.94 765.641C1083.39 759.349 1092.74 754.437 1103.04 750.848C1113.33 747.277 1124.33 745.482 1136.02 745.482C1147.72 745.482 1158.66 747.277 1168.84 750.848C1179 754.419 1188.34 759.349 1196.84 765.641C1205.34 771.932 1212.9 779.356 1219.47 787.915C1226.06 796.473 1231.64 805.692 1236.19 815.554C1240.74 825.416 1244.24 835.769 1246.64 846.613C1249.04 857.458 1250.25 868.245 1250.25 878.957V878.957ZM1172.24 884.512C1172.24 879.089 1171.5 873.044 1170.03 866.394C1168.56 859.744 1166.27 853.528 1163.19 847.728C1160.11 841.947 1156.16 837.073 1151.36 833.124C1146.57 829.176 1140.82 827.211 1134.17 827.211C1127.52 827.211 1121.61 829.176 1116.79 833.124C1111.99 837.073 1108.01 841.928 1104.87 847.728C1101.73 853.528 1099.41 859.744 1097.94 866.394C1096.46 873.044 1095.73 879.089 1095.73 884.512C1095.73 889.934 1096.46 895.979 1097.94 902.629C1099.41 909.279 1101.73 915.514 1104.87 921.295C1108.01 927.095 1111.99 931.95 1116.79 935.899C1121.59 939.847 1127.39 941.812 1134.17 941.812C1140.95 941.812 1146.55 939.847 1151.36 935.899C1156.16 931.95 1160.11 927.095 1163.19 921.295C1166.27 915.495 1168.56 909.279 1170.03 902.629C1171.5 895.979 1172.24 889.934 1172.24 884.512Z"
            fill="white"
          />
          <path
            id="4-R"
            d="M1453 922.58L1436.73 922.958L1433.41 1002.82L1349.87 1010.2L1354.31 924.809L1255.61 927.02L1282.97 764.734H1352.83L1332.5 877.862L1356.89 877.125L1363.92 737H1444.14L1438.59 874.14L1453 873.403V922.561V922.58Z"
            fill="white"
          />
          <circle id="star_9" cx="1715.97" cy="724.932" r="14.1716" fill="white" />
          <circle id="star_8" cx="621.172" cy="516.172" r="14.1716" fill="white" />
          <circle id="star_7" cx="667.172" cy="1138.17" r="14.1716" fill="white" />
          <circle id="star_6" cx="1814.82" cy="800.974" r="14.1716" fill="white" />
          <circle id="star_5" cx="265.172" cy="829.172" r="14.1716" fill="white" />
          <circle id="star_4" cx="565" cy="1073" r="9" fill="white" />
          <circle id="star_3" cx="1844.55" cy="659.95" r="7.94992" fill="white" />
          <circle id="star_2" cx="1883.95" cy="1001.95" r="7.94992" fill="white" />
          <circle id="star_1" cx="463.95" cy="594.95" r="7.94992" fill="white" />
          <path
            id="planet_2"
            d="M1647 1190.69L1654.94 1180L1657.88 1193.01L1669.46 1186.5L1666.88 1199.59L1680.09 1198.37L1672.44 1209.27L1685 1213.56L1673.6 1220.39L1683.34 1229.45L1670.17 1231.03L1675.39 1243.28L1662.72 1239.33L1662.54 1252.67L1652.56 1243.88L1647 1256L1641.44 1243.88L1631.46 1252.67L1631.28 1239.33L1618.61 1243.28L1623.84 1231.03L1610.66 1229.45L1620.4 1220.39L1609 1213.56L1621.56 1209.27L1613.91 1198.37L1627.13 1199.59L1624.54 1186.5L1636.12 1193.01L1639.06 1180L1647 1190.69Z"
            fill="white"
          />
          <path
            id="planet_1"
            d="M620.931 730.736L634.162 723L638.041 737.828L652.869 741.707L645.126 754.931L652.869 768.162L638.041 772.041L634.162 786.869L620.931 779.126L607.707 786.869L603.828 772.041L589 768.162L596.736 754.931L589 741.707L603.828 737.828L607.707 723L620.931 730.736Z"
            fill="white"
          />
          <g id="alien">
            <g id="alien-head">
              <circle id="Ellipse 24" cx="1156.53" cy="435.375" r="70.5" transform="rotate(7.76141 1156.53 435.375)" fill="#B5F7C3" />
              <circle id="Ellipse 25" cx="1143.86" cy="399.328" r="14.9294" transform="rotate(7.76141 1143.86 399.328)" fill="white" />
              <circle id="Ellipse 26" cx="1178.38" cy="404.033" r="14.9294" transform="rotate(7.76141 1178.38 404.033)" fill="white" />
              <line id="Line 5" x1="1133.66" y1="382.034" x2="1192.83" y2="390.099" stroke="black" strokeWidth="11.6118" strokeLinecap="round" />
              <line id="Line 6" x1="1159.36" y1="402.278" x2="1157.35" y2="417.071" stroke="#09A82D" strokeWidth="11.6118" strokeLinecap="round" />
              <line id="Line 7" x1="1134.45" y1="431.529" x2="1164.03" y2="435.561" stroke="#5EDF7A" strokeWidth="16.5882" strokeLinecap="round" />
              <line id="Line 8" x1="1136.09" y1="431.753" x2="1160.75" y2="435.113" stroke="#09A82D" strokeWidth="3.31765" strokeLinecap="round" />
              <circle id="left-eye" cx="1137.38" cy="399.282" r="5.18382" transform="rotate(7.76141 1137.38 399.282)" fill="black" />
              <circle id="right-eye" cx="1171.89" cy="403.987" r="5.18382" transform="rotate(7.76141 1171.89 403.987)" fill="black" />
              <circle id="Ellipse 30" cx="1193.69" cy="421.324" r="1.65417" transform="rotate(7.76141 1193.69 421.324)" fill="#5EDF7A" />
              <circle id="Ellipse 33" cx="1119.23" cy="410.376" r="1.65417" transform="rotate(7.76141 1119.23 410.376)" fill="#5EDF7A" />
              <circle id="Ellipse 31" cx="1187.37" cy="432.455" r="1.65417" transform="rotate(7.76141 1187.37 432.455)" fill="#5EDF7A" />
              <circle id="Ellipse 34" cx="1112.92" cy="421.507" r="1.65417" transform="rotate(7.76141 1112.92 421.507)" fill="#5EDF7A" />
              <circle id="Ellipse 32" cx="1199.79" cy="429.35" r="1.65417" transform="rotate(7.76141 1199.79 429.35)" fill="#5EDF7A" />
              <circle id="Ellipse 35" cx="1125.33" cy="418.403" r="1.65417" transform="rotate(7.76141 1125.33 418.403)" fill="#5EDF7A" />
            </g>
            <path id="alien_hand-R" d="M1077.07 400.9C1078.47 405.192 1082.03 412.875 1092.04 416.39" stroke="#B5F7C3" strokeWidth="12" strokeLinecap="round" />
            <path id="alien_hand-L" d="M1225.41 436.218C1229.9 435.767 1240.03 429.375 1243.72 424.875" stroke="#B5F7C3" strokeWidth="12" strokeLinecap="round" />
          </g>
          <g id="UFO">
            <path
              id="Vector"
              d="M1193.96 510.931C1178.99 486.957 1152.37 471 1122.01 471C1075.31 471 1037.41 508.775 1037.23 555.454C1015.66 572.125 997.298 592.712 983.194 616.171C990.272 605.374 1011.08 591.984 1040.4 578.82C1062.87 568.738 1090.33 558.788 1120.44 550.227C1150.55 541.68 1179.14 535.713 1203.56 532.498C1235.85 528.237 1260.83 528.767 1272.32 534.429C1248.44 521.992 1221.99 513.816 1193.96 510.918V510.931Z"
              fill="#FFD12E"
            />
            <path
              id="Vector_2"
              d="M1278.95 541.217C1278.25 538.743 1276.33 536.666 1273.38 534.998C1273.03 534.813 1272.68 534.628 1272.33 534.443C1260.85 528.767 1235.87 528.237 1203.57 532.511C1179.16 535.739 1150.57 541.693 1120.45 550.241C1090.34 558.788 1062.88 568.738 1040.42 578.833C1011.08 591.984 990.259 605.374 983.18 616.171C982.85 616.726 982.519 617.295 982.188 617.851C980.64 620.749 980.137 623.435 980.825 625.856C984.146 637.565 1014.11 640.172 1056.68 634.509C1060.87 648.865 1074.13 659.37 1089.85 659.37C1103.93 659.37 1116.03 650.942 1121.42 638.862C1125.8 640.635 1130.59 641.614 1135.61 641.614C1148.37 641.614 1159.63 635.316 1166.51 625.657C1171.93 629.19 1178.4 631.254 1185.36 631.254C1204.44 631.254 1219.92 615.787 1219.92 596.695C1219.92 593.85 1219.58 591.098 1218.93 588.452C1258.15 570.907 1282.29 552.926 1278.96 541.217H1278.95Z"
              fill="#FF9C27"
            />
          </g>
          <g id="alien_Leg-L">
            <path id="Vector 5" d="M1167.32 481.051C1162.81 481.266 1152.72 483.64 1148.44 491.418" stroke="#09A82D" strokeWidth="12" strokeLinecap="round" />
            <path id="Vector 9" d="M1142.36 487.071L1147.87 490.931" stroke="#09A82D" strokeWidth="12" strokeLinecap="round" />
          </g>
          <g id="alien_Leg-R">
            <path id="Vector 5_2" d="M1105.5 470C1100 471 1094 473.5 1090.43 479.918" stroke="#09A82D" strokeWidth="12" strokeLinecap="round" />
            <path id="Vector 9_2" d="M1084.36 475.571L1089.87 479.432" stroke="#09A82D" strokeWidth="12" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </Base>
  );
};

const Base = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #24145e;
  width: 100vw;
  height: 100vh;

  @keyframes rotation {
    to {
      transform: rotateZ(360deg);
    }
  }

  @keyframes shrinkAndGrow {
    0% {
      transform: scale(0);
    }

    25% {
      transform: scale(0.5);
    }
    50% {
      transform: scale(0);
    }
    75% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes expandHorizontal {
    from {
      transform: scaleX(0);
    }

    to {
      transform: scaleX(1);
    }
  }

  @keyframes appearFromBottom {
    from {
      transform: translateY(1000px);
    }

    to {
      transform: translateY(0);
    }
  }

  @keyframes shakingUpAndDown {
    from {
      transform: translateY(0);
    }

    25% {
      transform: translateY(5px);
    }
    50% {
      transform: translateY(-5px);
    }
    75% {
      transform: translateY(5px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes soaking {
    to {
      transform: translateY(-250px) scale(0);
    }
  }

  @keyframes shrinkHorizontal {
    to {
      transform: scaleX(0);
    }
  }

  #planet_2 {
    animation-name: rotation;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    transform-box: fill-box;
    transform-origin: center;
  }

  #planet_1 {
    animation-name: rotation;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    transform-box: fill-box;
    transform-origin: center;
  }

  #star_6 {
    animation: shrinkAndGrow 4s infinite;
    transform-box: fill-box;
    transform-origin: center;
  }
  #star_3 {
    animation: shrinkAndGrow 2s infinite;
    transform-box: fill-box;
    transform-origin: center;
  }
  #star_4 {
    animation: shrinkAndGrow 6s infinite;
    transform-box: fill-box;
    transform-origin: center;
  }
  #star_5 {
    animation: shrinkAndGrow 11s infinite;
    transform-box: fill-box;
    transform-origin: center;
  }
  #star_7 {
    animation: shrinkAndGrow 2s infinite;
    transform-box: fill-box;
    transform-origin: center;
  }
  #star_8 {
    animation: shrinkAndGrow 9s infinite;
    transform-box: fill-box;
    transform-origin: center;
  }
  #star_9 {
    animation: shrinkAndGrow 14s infinite;
    transform-box: fill-box;
    transform-origin: center;
  }

  #UFO-beam {
    animation: expandHorizontal 2s;
    transform-box: fill-box;
    transform-origin: center;
  }

  #number-0 {
    animation: appearFromBottom 2s;
  }

  #alien_hand-R,
  #alien_hand-L {
    animation: shakingUpAndDown 1s infinite;
  }

  #number-0-soaking {
    animation: soaking 2s;
    transform-box: fill-box;
    transform-origin: center;
  }

  #UFO-beam-disappear {
    animation: shrinkHorizontal 2s;
    transform-box: fill-box;
    transform-origin: center;
  }
`;

export default NotFound;
