import React from "react";

export const StageFilterDefs: React.FC = () => {
  return (
    <>
      {/* Hidden SVG with filter definitions */}
      <svg
        className="filter-defs"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <defs>
          {/* Card Noise Filter */}
          <filter id="cardNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.54"
              numOctaves={3}
              seed={27}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.8" intercept="-0.25" />
              <feFuncG type="linear" slope="1.8" intercept="-0.25" />
              <feFuncB type="linear" slope="1.8" intercept="-0.25" />
              <feFuncA type="table" tableValues="0 0.52" />
            </feComponentTransfer>
          </filter>

          {/* Radar & Gauge Filters */}
          <filter id="radarSoft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.35" />
          </filter>
          <filter id="radarHalo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5.2" />
          </filter>
          <filter id="gaugeBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="11" />
          </filter>

          {/* Tile Wall Filters */}
          <filter id="tileSoft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.4" />
          </filter>
          <filter id="groutSoft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6.5" />
          </filter>
          <filter id="panelNoiseF" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6"
              numOctaves={3}
              seed={71}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.35" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* Hidden Paper Texture SVG as required by spec */}
      <svg
        className="paper-texture"
        style={{ display: "none", position: "absolute", inset: 0, zIndex: -1 }}
        aria-hidden="true"
      >
        <filter id="paperNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves={4}
            seed={8}
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <pattern
          id="paperFiber"
          width="100"
          height="100"
          patternTransform="rotate(17)"
        >
          <rect
            width="100"
            height="100"
            fill="var(--background)"
            filter="url(#paperNoise)"
          />
        </pattern>
      </svg>
    </>
  );
};
