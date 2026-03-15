'use client';

import { motion } from 'framer-motion';

const comparisonData = [
  { feature: 'Delivery Time', solvexai: '2-7 days', upwork: '2-6 weeks', fiverr: '1-4 weeks' },
  { feature: 'Price Range', solvexai: '$497-7K', upwork: '$10-50K', fiverr: '$5-20K' },
  { feature: 'Maintenance', solvexai: true, upwork: false, fiverr: false },
  { feature: 'Support', solvexai: '24/7', upwork: 'Limited', fiverr: 'Limited' },
  { feature: 'Revisions', solvexai: 'Unlimited', upwork: 'Varies', fiverr: 'Limited' },
];

export const ComparisonTable = () => {
  return (
    <section className="py-32 px-6 flex justify-center bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="max-w-6xl w-full">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            Why SolveXAI?
          </h2>
          <p className="text-xl text-gray-400">
            Compare us to traditional freelance platforms
          </p>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-6 px-6 text-gray-400 font-normal">Feature</th>
                <th className="py-6 px-6">
                  <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-purple-500/50 rounded-2xl px-6 py-3 shadow-xl shadow-purple-500/20">
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      SolveXAI
                    </span>
                  </div>
                </th>
                <th className="text-center py-6 px-6 text-gray-400 font-normal">Upwork</th>
                <th className="text-center py-6 px-6 text-gray-400 font-normal">Fiverr</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-gray-800/50 hover:bg-gray-900/30 transition-colors"
                >
                  <td className="py-6 px-6 text-gray-300 font-medium">{row.feature}</td>
                  
                  {/* SolveXAI Column - Highlighted */}
                  <td className="py-6 px-6 text-center bg-purple-900/10">
                    {typeof row.solvexai === 'boolean' ? (
                      row.solvexai ? (
                        <span className="text-green-400 text-2xl">✓</span>
                      ) : (
                        <span className="text-red-400 text-2xl">✗</span>
                      )
                    ) : (
                      <span className="text-white font-semibold">{row.solvexai}</span>
                    )}
                  </td>
                  
                  {/* Upwork Column */}
                  <td className="py-6 px-6 text-center">
                    {typeof row.upwork === 'boolean' ? (
                      row.upwork ? (
                        <span className="text-green-400 text-2xl">✓</span>
                      ) : (
                        <span className="text-red-400 text-2xl">✗</span>
                      )
                    ) : (
                      <span className="text-gray-400">{row.upwork}</span>
                    )}
                  </td>
                  
                  {/* Fiverr Column */}
                  <td className="py-6 px-6 text-center">
                    {typeof row.fiverr === 'boolean' ? (
                      row.fiverr ? (
                        <span className="text-green-400 text-2xl">✓</span>
                      ) : (
                        <span className="text-red-400 text-2xl">✗</span>
                      )
                    ) : (
                      <span className="text-gray-400">{row.fiverr}</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile-Friendly Cards (Hidden on Desktop) */}
        <div className="md:hidden space-y-6 mt-8">
          {comparisonData.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4 text-purple-400">{row.feature}</h3>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <p className="text-gray-500 mb-2">SolveXAI</p>
                  <p className="font-semibold text-white">
                    {typeof row.solvexai === 'boolean' 
                      ? (row.solvexai ? '✓' : '✗') 
                      : row.solvexai}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-2">Upwork</p>
                  <p className="text-gray-400">
                    {typeof row.upwork === 'boolean' 
                      ? (row.upwork ? '✓' : '✗') 
                      : row.upwork}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-2">Fiverr</p>
                  <p className="text-gray-400">
                    {typeof row.fiverr === 'boolean' 
                      ? (row.fiverr ? '✓' : '✗') 
                      : row.fiverr}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
