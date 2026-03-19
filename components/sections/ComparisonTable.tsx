'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';

const comparisonData = [
  { feature: 'Delivery Time', solvexai: '2-7 days', upwork: '2-6 weeks', fiverr: '1-4 weeks' },
  { feature: 'Price Range', solvexai: '$487-7K', upwork: '$10-50K', fiverr: '$5-20K' },
  { feature: 'Maintenance', solvexai: true, upwork: false, fiverr: false },
  { feature: 'Support', solvexai: '24/7', upwork: 'Limited', fiverr: 'Limited' },
  { feature: 'Revisions', solvexai: 'Unlimited', upwork: 'Varies', fiverr: 'Limited' },
];

export const ComparisonTable = () => {
  return (
    <section className="py-32 px-6 flex justify-center relative">
      <div className="max-w-6xl w-full">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Why SolveXAI?
          </h2>
          <p className="text-xl text-gray-400">
            Compare us to traditional freelance platforms
          </p>
        </motion.div>

        {/* Glassmorphic Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <LiquidGlassCard 
            intensity="heavy" 
            glowColor="#8B5CF6"
            className="p-8 md:p-12 border border-transparent"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 30, 50, 0.6) 0%, rgba(20, 20, 40, 0.6) 100%)',
              borderImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(168, 85, 247, 0.5)) 1',
              borderImageSlice: 1,
              boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)',
            }}
          >
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-8 px-6 text-gray-400 font-medium text-lg">Feature</th>
                    
                    {/* SolveXAI Column - Premium Highlight */}
                    <th className="py-8 px-6 relative">
                      <div className="relative">
                        {/* "RECOMMENDED" Badge */}
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                          className="absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-full"
                        >
                          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-purple-500/50">
                            RECOMMENDED
                          </span>
                        </motion.div>
                        
                        {/* Premium Gradient Background */}
                        <div className="bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-2 border-gradient rounded-2xl px-8 py-4 shadow-2xl relative overflow-hidden"
                          style={{
                            borderImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(168, 85, 247, 0.8)) 1',
                            boxShadow: '0 0 30px rgba(139, 92, 246, 0.4), inset 0 0 20px rgba(139, 92, 246, 0.1)',
                          }}
                        >
                          {/* Glow effect background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl"></div>
                          
                          <span className="relative text-2xl font-extrabold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg"
                            style={{
                              textShadow: '0 0 20px rgba(139, 92, 246, 0.6)',
                            }}
                          >
                            SolveXAI
                          </span>
                        </div>
                      </div>
                    </th>
                    
                    <th className="text-center py-8 px-6 text-gray-400 font-medium text-lg">Upwork</th>
                    <th className="text-center py-8 px-6 text-gray-400 font-medium text-lg">Fiverr</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                      className="border-b border-gray-800/30 hover:bg-gradient-to-r hover:from-purple-900/10 hover:to-transparent transition-all duration-300 group"
                    >
                      <td className="py-6 px-6 text-gray-300 font-semibold text-base">{row.feature}</td>
                      
                      {/* SolveXAI Column - Highlighted with gradient background */}
                      <td className="py-6 px-6 text-center relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        
                        {typeof row.solvexai === 'boolean' ? (
                          row.solvexai ? (
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <CheckCircle2 
                                className="w-7 h-7 mx-auto relative z-10" 
                                style={{
                                  color: '#10b981',
                                  filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))',
                                }}
                              />
                            </motion.div>
                          ) : (
                            <X className="w-7 h-7 text-red-500/60 mx-auto relative z-10" />
                          )
                        ) : (
                          <span 
                            className="relative z-10 text-white font-bold text-lg bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent"
                            style={{
                              textShadow: '0 0 15px rgba(139, 92, 246, 0.5)',
                            }}
                          >
                            {row.solvexai}
                          </span>
                        )}
                      </td>
                      
                      {/* Upwork Column */}
                      <td className="py-6 px-6 text-center">
                        {typeof row.upwork === 'boolean' ? (
                          row.upwork ? (
                            <CheckCircle2 className="w-7 h-7 text-green-400 mx-auto" />
                          ) : (
                            <X className="w-7 h-7 text-gray-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-400 font-medium">{row.upwork}</span>
                        )}
                      </td>
                      
                      {/* Fiverr Column */}
                      <td className="py-6 px-6 text-center">
                        {typeof row.fiverr === 'boolean' ? (
                          row.fiverr ? (
                            <CheckCircle2 className="w-7 h-7 text-green-400 mx-auto" />
                          ) : (
                            <X className="w-7 h-7 text-gray-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-400 font-medium">{row.fiverr}</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden space-y-6">
              {comparisonData.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <LiquidGlassCard
                    intensity="medium"
                    glowColor="#8B5CF6"
                    className="p-6"
                    style={{
                      background: 'rgba(30, 30, 50, 0.4)',
                    }}
                  >
                    <h3 className="text-lg font-bold mb-6 text-purple-300">{row.feature}</h3>
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      
                      {/* SolveXAI Mobile */}
                      <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-xl p-3 border border-purple-500/30">
                        <p className="text-gray-400 mb-3 text-xs font-semibold">SolveXAI</p>
                        <div className="font-bold text-white flex justify-center items-center">
                          {typeof row.solvexai === 'boolean' 
                            ? (row.solvexai ? (
                                <CheckCircle2 
                                  className="w-6 h-6" 
                                  style={{
                                    color: '#10b981',
                                    filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.6))',
                                  }}
                                />
                              ) : (
                                <X className="w-6 h-6 text-red-500/60" />
                              ))
                            : <span className="text-sm bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">{row.solvexai}</span>
                          }
                        </div>
                      </div>
                      
                      {/* Upwork Mobile */}
                      <div className="bg-gray-800/20 rounded-xl p-3">
                        <p className="text-gray-500 mb-3 text-xs font-semibold">Upwork</p>
                        <div className="text-gray-400 flex justify-center items-center">
                          {typeof row.upwork === 'boolean' 
                            ? (row.upwork ? <CheckCircle2 className="w-6 h-6 text-green-400" /> : <X className="w-6 h-6 text-gray-600" />) 
                            : <span className="text-sm">{row.upwork}</span>
                          }
                        </div>
                      </div>
                      
                      {/* Fiverr Mobile */}
                      <div className="bg-gray-800/20 rounded-xl p-3">
                        <p className="text-gray-500 mb-3 text-xs font-semibold">Fiverr</p>
                        <div className="text-gray-400 flex justify-center items-center">
                          {typeof row.fiverr === 'boolean' 
                            ? (row.fiverr ? <CheckCircle2 className="w-6 h-6 text-green-400" /> : <X className="w-6 h-6 text-gray-600" />) 
                            : <span className="text-sm">{row.fiverr}</span>
                          }
                        </div>
                      </div>
                      
                    </div>
                  </LiquidGlassCard>
                </motion.div>
              ))}
            </div>
          </LiquidGlassCard>
        </motion.div>

      </div>
    </section>
  );
};
