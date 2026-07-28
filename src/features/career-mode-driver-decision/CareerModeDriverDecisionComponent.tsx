import { useAppDispatch, useAppSelector } from "@/app/store";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CareerModeDriverDecisionComponent.module.css";
import { CardDecision } from "@/shared/ui/card-decision";
import { ButtonDecision } from "@/shared/ui/button-decision";
import type { SituationOptions } from "@/entities/situations/models/types";
import { resolveSituation } from "@/entities/seasons/models/seasonThunk";

export function CareerModeDriverDecisionComponent() {
  const dispatch = useAppDispatch();
  const season = useAppSelector((state) => state.season);

  const handleDecision = (option: SituationOptions) => {
    dispatch(resolveSituation(option)).then(() => {
    });
  };

  if (!season.pendingSituation) return null;

  return (
    <motion.div animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className={styles.decisionContainer}>
        <div className={styles.decisionHeader}>
          <CardDecision
            title={season.pendingSituation.title}
            description={season.pendingSituation.description}
          />
        </div>
        <div className={styles.decisionBody}>
          <div className={styles.optionGrid}>
            <AnimatePresence mode="popLayout">
              {season.pendingSituation.options.map((option, i) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  style={{ display: 'contents' }}
                >
                  <ButtonDecision
                    label={option.label}
                    title={option.description}
                    image={option.image}
                    onClick={() => handleDecision(option)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}